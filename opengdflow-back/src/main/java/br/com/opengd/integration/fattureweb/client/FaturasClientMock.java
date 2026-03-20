package br.com.opengd.integration.fattureweb.client;


import br.com.opengd.integration.fattureweb.dto.conteudo.ConteudoDTO;
import br.com.opengd.integration.fattureweb.dto.fatura.FaturasDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

@Component
public class FaturasClientMock implements FaturasClient {

    @Override
    public FaturasDTO listarFaturas(String token, Long limit, Long skip, String dataAtualizacaoInicio, String dataAtualizacaoFim) {
        // Retorno mockado para listarFaturas
        String json = "{" +
                "\"status\": \"sucesso\"," +
                "\"mensagem\": \"Faturas encontradas.\"," +
                "\"dados\": [" +
                "{" +
                "\"id\": 6886228," +
                "\"instalacao_id\": 886103," +
                "\"data_criacao\": \"2025-02-27T16:15:10.659733-03:00\"," +
                "\"data_atualizacao\": \"2025-02-27T16:15:10.659733-03:00\"," +
                "\"data_processamento\": \"2025-02-27T16:15:10.410016-03:00\"," +
                "\"erro_processamento\": \"\"," +
                "\"mes_referencia\": \"2022-06-01T00:00:00-03:00\"," +
                "\"data_vencimento\": \"2022-07-15T00:00:00-03:00\"," +
                "\"valor_total\": 206.8," +
                "\"total_fatura\": null" +
                "}," +
                "{" +
                "\"id\": 6886227," +
                "\"instalacao_id\": 886102," +
                "\"data_criacao\": \"2025-02-27T16:15:08.836324-03:00\"," +
                "\"data_atualizacao\": \"2025-02-27T16:15:08.836324-03:00\"," +
                "\"data_processamento\": \"2025-02-27T16:15:08.651312-03:00\"," +
                "\"erro_processamento\": \"\"," +
                "\"mes_referencia\": \"2023-02-01T00:00:00-03:00\"," +
                "\"data_vencimento\": \"2023-03-11T00:00:00-03:00\"," +
                "\"valor_total\": 55.79," +
                "\"total_fatura\": 55.79" +
                "}" +
                "]" +
                "}";

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.readValue(json, FaturasDTO.class);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao converter JSON para ConteudoResponse", e);
        }
    }

    @Override
    public ConteudoDTO baixarFatura(String idFatura, String token) {
        // Retorno mockado para baixarFatura
        String json = "{" +
                "\"status\": \"sucesso\"," +
                "\"mensagem\": \"Fatura encontrada.\"," +
                "\"dados\": {" +
                "\"fatura\": {" +
                "\"leitura\": {" +
                "\"medidores\": [" +
                "{" +
                "\"leituras\": [" +
                "{" +
                "\"posto\": \"ÚNICO\"," +
                "\"valor_atual\": 41364," +
                "\"valor_leitura\": 100," +
                "\"valor_anterior\": 41326," +
                "\"ativa_ou_reativa\": \"ATIVA\"," +
                "\"consumo_ou_geracao\": \"CONSUMO\"," +
                "\"energia_ou_demanda\": \"ENERGIA\"," +
                "\"fator_multiplicador\": 1" +
                "}," +
                "{" +
                "\"posto\": \"PONTA\"," +
                "\"valor_atual\": 0," +
                "\"valor_leitura\": 0," +
                "\"valor_anterior\": 0," +
                "\"ativa_ou_reativa\": \"ATIVA\"," +
                "\"criterio_medicao\": \"ACUMULADO\"," +
                "\"consumo_ou_geracao\": \"CONSUMO\"," +
                "\"energia_ou_demanda\": \"ENERGIA\"," +
                "\"fator_multiplicador\": 0" +
                "}" +
                "]," +
                "\"numero_medidor\": \"TDT1715990\"," +
                "\"taxa_perda_transformacao\": 0" +
                "}" +
                "]," +
                "\"data_atual\": \"2022-06-28 03:00:00+00:00\"," +
                "\"periodo_dias\": 32," +
                "\"data_anterior\": \"2022-05-27 03:00:00+00:00\"," +
                "\"fator_potencia\": null" +
                "}," +
                "\"produtos\": [" +
                "{" +
                "\"descricao\": \"Consumo kWh\"," +
                "\"quantidade\": 100," +
                "\"valor_total\": 58.02," +
                "\"valor_sem_impostos\": null," +
                "\"tarifa_com_impostos\": 0.580255," +
                "\"tarifa_sem_impostos\": 0.58017," +
                "\"descricoes_originais\": [" +
                "\"Consumo (Quant: 100.0; TariSImp: 0.58017; TariCImp: 0.580255; ValCImp: 58.02)\"" +
                "]" +
                "}," +
                "{" +
                "\"descricao\": \"Débitos de Serviços Cobráveis pela Distribuidora\"," +
                "\"valor_total\": 38.08," +
                "\"valor_sem_impostos\": null," +
                "\"descricoes_originais\": [" +
                "\"Religacao (ValCImp: 38.08)\"" +
                "]" +
                "}," +
                "{" +
                "\"descricao\": \"Multas/Juros/Corr.Monetária de Cont. Ilum. Pública\"," +
                "\"valor_total\": 3.86," +
                "\"valor_sem_impostos\": null," +
                "\"descricoes_originais\": [" +
                "\"Correcao Monetaria Da Il. Publica 03/2022-00 (ValCImp: 0.63)\"," +
                "\"Correcao Monetaria Da Il. Publica 04/2022-00 (ValCImp: 0.19)\"," +
                "\"Multa Por Atraso De Il. Publica 04/2022-00 (ValCImp: 0.69)\"," +
                "\"Multa Por Atraso De Il. Publica 03/2022-00 (ValCImp: 1.67)\"," +
                "\"Juros De Mora Por Atraso De Il. Publica 03/2022-00 (ValCImp: 0.5)\"," +
                "\"Juros De Mora Por Atraso De Il. Publica 04/2022-00 (ValCImp: 0.18)\"" +
                "]" +
                "}," +
                "{" +
                "\"descricao\": \"Multas/Juros/Corr.Monetária\"," +
                "\"valor_total\": 83.77," +
                "\"valor_sem_impostos\": null," +
                "\"descricoes_originais\": [" +
                "\"Correção Monetária Ipca/Igpm 04/2022-00 (ValCImp: 6.79)\"," +
                "\"Correção Monetária Ipca/Igpm 03/2022-00 (ValCImp: 20.72)\"," +
                "\"Multa Por Atraso 03/2022-00 (ValCImp: 17.81)\"," +
                "\"Multa Por Atraso 04/2022-00 (ValCImp: 16.02)\"," +
                "\"Juros De Mora De Importe / Serviços 04/2022-00 (ValCImp: 6.4)\"," +
                "\"Juros De Mora De Importe / Serviços 03/2022-00 (ValCImp: 16.03)\"" +
                "]" +
                "}," +
                "{" +
                "\"descricao\": \"Dados Informativos - Isenção ICMS\"," +
                "\"valor_total\": 11.88," +
                "\"valor_sem_impostos\": null," +
                "\"descricoes_originais\": [" +
                "\"Isencao Icms (ValCImp: 11.88)\"" +
                "]" +
                "}" +
                "]," +
                "\"total_pagar\": 206.8," +
                "\"data_emissao\": \"2022-06-27 03:00:00+00:00\"," +
                "\"numero_fatura\": null," +
                "\"data_pagamento\": \"2022-07-20 03:00:00+00:00\"," +
                "\"mes_referencia\": \"2022-06-01 03:00:00+00:00\"," +
                "\"data_vencimento\": \"2022-07-15 03:00:00+00:00\"" +
                "}," +
                "\"outros\": {" +
                "\"nota_fiscal\": \"10\"," +
                "\"possui_debitos\": null," +
                "\"debito_automatico\": false" +
                "}," +
                "\"fatura_id\": 6886228," +
                "\"data_insercao\": \"2025-02-27T16:15:10.321095-03:00\"," +
                "\"distribuidora\": \"rre\"," +
                "\"fatura_origem\": \"SITE\"," +
                "\"modelo_fatura\": \"Modelo 3\"," +
                "\"distribuidora_cnpj\": \"02.341.470/0001-44\"," +
                "\"unidade_consumidora\": {" +
                "\"nome\": \"CLIENTE 1\", " +
                "\"cpf_cnpj\": \"42.967.320/0001-71\"," +
                "\"endereco\": \"RUA PRC, N 100 SAO FRANCISCO 69.0000-135 - BOA VISTA - RR\"," +
                "\"subgrupo\": null," +
                "\"instalacao\": \"1111111\"," +
                "\"tipo_ligacao\": null," +
                "\"limite_tensao\": null," +
                "\"tipo_contrato\": \"CT\"," +
                "\"categoria_tensao\": \"BT\"" +
                "}" +
                "}" +
                "}";

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.readValue(json, ConteudoDTO.class);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao converter JSON para ConteudoResponse", e);
        }
    }
}