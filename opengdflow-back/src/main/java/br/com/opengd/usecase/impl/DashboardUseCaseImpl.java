package br.com.opengd.usecase.impl;

import br.com.opengd.controller.response.DashboardEnergiaGeradaConsumidaResponse;
import br.com.opengd.controller.response.DashboardResumoGeralResponse;
import br.com.opengd.controller.response.DashboardTitulosUsinaConsumidorResponse;
import br.com.opengd.exception.BusinessException;
import br.com.opengd.repository.CustomRepository;
import br.com.opengd.usecase.DashboardUseCase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DashboardUseCaseImpl implements DashboardUseCase {

    @Autowired
    private CustomRepository customRepository;

    private BigDecimal getTotalEnergiaGerada() {
        String sql = "select coalesce(SUM(leitura_atual_geracao),0) as totalenergiagerada from fatura f inner join usina u on f.usina_id = u.id where u.status = 'ATIVO' and mes_referencia between date_trunc('month', CURRENT_DATE) AND (date_trunc('month', CURRENT_DATE) + interval '1 month - 1 day')";
        List<BigDecimal> result = customRepository.executeQuery(sql, BigDecimal.class);
        return result.isEmpty() ? BigDecimal.ZERO : result.get(0);
    }

    private BigDecimal getTotalEnergiaDistribuida() {
        String sql = "select coalesce(SUM(credito_distribuidos),0) as totalenergiadistribuida from fatura f inner join usina u on f.usina_id = u.id where mes_referencia between date_trunc('month', CURRENT_DATE) AND (date_trunc('month', CURRENT_DATE) + interval '1 month - 1 day')";
        List<BigDecimal> result = customRepository.executeQuery(sql, BigDecimal.class);
        return result.isEmpty() ? BigDecimal.ZERO : result.get(0);
    }

    private BigDecimal getSaldoAcumulado() {
        String sql = "select coalesce(SUM(movimentacao_saldo),0) as saldoacumulado from fatura f inner join consumidor c on f.consumidor_id = c.id";
        List<BigDecimal> result = customRepository.executeQuery(sql, BigDecimal.class);
        return result.isEmpty() ? BigDecimal.ZERO : result.get(0);
    }

    private BigDecimal getUsinasAtivas() {
        String sql = "select coalesce(count(id),0) as qtd from usina u where u.status = 'ATIVO'";
        List<BigDecimal> result = customRepository.executeQuery(sql, BigDecimal.class);
        return result.isEmpty() ? BigDecimal.ZERO : result.get(0);
    }

    private BigDecimal getConsumidoresAtivos() {
        String sql = "select coalesce(count(id),0) as qtd from consumidor c where c.status = 'ATIVO'";
        List<BigDecimal> result = customRepository.executeQuery(sql, BigDecimal.class);
        return result.isEmpty() ? BigDecimal.ZERO : result.get(0);
    }

    @Override
    public DashboardResumoGeralResponse getResumoGeral() throws BusinessException {
        DashboardResumoGeralResponse response = new DashboardResumoGeralResponse();
        response.setTotalEnergiaGerada(getTotalEnergiaGerada());
        response.setTotalEnergiaDistribuida(getTotalEnergiaDistribuida());
        response.setSaldoAcumulado(getSaldoAcumulado());
        response.setUsinasAtivas(getUsinasAtivas());
        response.setConsumidoresAtivos(getConsumidoresAtivos());
        return response;
    }

    @Override
    public List<DashboardEnergiaGeradaConsumidaResponse> getEnergiaGeradaVsConsumida(LocalDate dataInicial, LocalDate dataFinal) throws BusinessException {
        Map<String, Object> params = new HashMap<>();
        params.put("dataInicial", dataInicial);
        params.put("dataFinal", dataFinal);

        String sql = "WITH meses AS (\n" +
                "    SELECT generate_series(\n" +
                "        :dataInicial,  \n" +
                "        :dataFinal,  \n" +
                "        INTERVAL '1 month'  \n" +
                "    ) AS mes_referencia\n" +
                "),\n" +
                "geracao AS (\n" +
                "    SELECT \n" +
                "        date_trunc('month', mes_referencia) AS mes_referencia,\n" +
                "        COALESCE(SUM(leitura_atual_geracao), 0) AS energiagerada\n" +
                "    FROM fatura f\n" +
                "    INNER JOIN usina u ON f.usina_id = u.id\n" +
                "    WHERE \n" +
                "        u.status = 'ATIVO'\n" +
                "        AND f.mes_referencia BETWEEN :dataInicial AND :dataFinal\n" +
                "    GROUP BY date_trunc('month', mes_referencia)\n" +
                "),\n" +
                "consumo AS (\n" +
                "    SELECT \n" +
                "        date_trunc('month', mes_referencia) AS mes_referencia,\n" +
                "        COALESCE(SUM(consumo), 0) AS energiaconsumida\n" +
                "    FROM fatura f\n" +
                "    INNER JOIN consumidor c ON f.consumidor_id = c.id\n" +
                "    WHERE \n" +
                "        c.status = 'ATIVO'\n" +
                "        AND f.mes_referencia BETWEEN :dataInicial AND :dataFinal\n" +
                "    GROUP BY date_trunc('month', mes_referencia)\n" +
                ")\n" +
                "SELECT \n" +
                "    to_char(m.mes_referencia, 'YYYY-MM') AS mes_referencia,\n" +
                "    COALESCE(g.energiagerada, 0) AS energia_gerada,\n" +
                "    COALESCE(c.energiaconsumida, 0) AS energia_consumida\n" +
                "FROM meses m\n" +
                "LEFT JOIN geracao g ON g.mes_referencia = m.mes_referencia\n" +
                "LEFT JOIN consumo c ON c.mes_referencia = m.mes_referencia\n" +
                "ORDER BY m.mes_referencia;";
        List<DashboardEnergiaGeradaConsumidaResponse> result = customRepository.executeQuery(sql, params, DashboardEnergiaGeradaConsumidaResponse.class);
        return result;
    }

    @Override
    public List<DashboardTitulosUsinaConsumidorResponse> getTitulosUsinaVsConsumidor(String status) throws BusinessException {
        String sql = "select u.nome as nome_usina, u.uc as uc_usina, c.nome as nome_consumidor, c.uc as uc_consumidor, t.mes_referencia as mes_referencia, t.data_vencimento as data_vencimento, t.valor_total as valor_total, t.status as status from titulo t left join usina u on t.usina_id = u.id left join consumidor c on t.consumidor_id = c.id ";
        if (status.equalsIgnoreCase("VENCIDAS")) {
            sql += " where t.data_vencimento < CURRENT_DATE order by t.data_vencimento desc limit 50";
        } else {
            sql += " where t.data_vencimento >= CURRENT_DATE order by t.data_vencimento desc limit 50";
        }
        List<Object[]> results = customRepository.executeQuery(sql, Object[].class);
        List<DashboardTitulosUsinaConsumidorResponse> result = results.stream()
                .map(r -> new DashboardTitulosUsinaConsumidorResponse(
                        (String) r[0],
                        (String) r[1],
                        (String) r[2],
                        (String) r[3],
                        ((java.sql.Date) r[4]).toLocalDate(),
                        ((java.sql.Date) r[5]).toLocalDate(),
                        (BigDecimal) r[6],
                        (String) r[7]
                ))
                .toList();
        return result;
    }
}
