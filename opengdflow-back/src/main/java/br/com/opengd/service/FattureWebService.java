package br.com.opengd.service;

import br.com.opengd.controller.response.FaturaResponse;
import br.com.opengd.entity.FattureWebProcessamento;
import br.com.opengd.exception.BusinessException;
import br.com.opengd.integration.fattureweb.client.AuthClient;
import br.com.opengd.integration.fattureweb.client.FaturasClient;
import br.com.opengd.integration.fattureweb.dto.AuthRequest;
import br.com.opengd.integration.fattureweb.dto.AuthResponse;
import br.com.opengd.integration.fattureweb.dto.conteudo.ConteudoDTO;
import br.com.opengd.integration.fattureweb.dto.fatura.FaturasDTO;
import br.com.opengd.integration.fattureweb.dto.fatura.FaturasDadosDTO;
import br.com.opengd.repository.FattureWebProcessamentoRepository;
import br.com.opengd.usecase.FattureWebUseCase;
import feign.FeignException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class FattureWebService {
    private final Long LIMIT = 10L;
    private final Long SKIP = 0L;

    private final AuthClient authClient;
    private final FaturasClient faturasClient;

    private final FattureWebUseCase fattureWebUseCase;

    @Autowired
    FattureWebProcessamentoRepository fattureWebProcessamentoRepository;


    @Value("${fattureweb.email}")
    private String email;

    @Value("${fattureweb.senha}")
    private String senha;

    public FattureWebService(AuthClient authClient, FaturasClient faturasClient, FattureWebUseCase fattureWebUseCase) {
        this.fattureWebUseCase = fattureWebUseCase;
        this.authClient = authClient;
        this.faturasClient = faturasClient;

        //Todo remover quando o mock for para produção
        //this.authClient = new AuthClientMock();
        //this.faturasClient = new FaturasClientMock();
    }

    public List<FaturaResponse> iniciarProcessamentoFaturas() throws BusinessException {
        String correlationId = UUID.randomUUID().toString();
        FattureWebProcessamento ultimoProcessamento = getUltimoProcessamento();
        LocalDateTime dataInicio = null;
        LocalDateTime dataFim = LocalDateTime.now();
        if (ultimoProcessamento != null) {
            dataInicio = ultimoProcessamento.getDataAtualizacaoFim();
        }
        try {
            List<FaturaResponse> retorno = processarFaturas(dataInicio, dataFim);
            saveUltimoProcessamento(dataInicio, dataFim, "SUCESSO", null, retorno.size(), correlationId);
            return retorno;
        } catch (Exception ex) {
            String erroMsg = ex.getMessage() != null && ex.getMessage().length() > 2000
                    ? ex.getMessage().substring(0, 2000) + "..." : ex.getMessage();
            saveUltimoProcessamento(dataInicio, dataFim, "ERRO", erroMsg, null, correlationId);
            throw ex instanceof BusinessException ? (BusinessException) ex : new BusinessException(ex.getMessage(), ex);
        }
    }

    public List<FaturaResponse> processarFaturas(LocalDateTime dataInicio, LocalDateTime dataFim) throws BusinessException {
        List<FaturaResponse> faturas = new ArrayList<>();
        String dataAtualizacaoInicio = formatarData(dataInicio);
        String dataAtualizacaoFim = formatarData(dataFim);
        String token = login();
        try {
            FaturasDTO response = faturasClient.listarFaturas(token, LIMIT, SKIP, dataAtualizacaoInicio, dataAtualizacaoFim);
            if (response == null || response.getDados() == null) {
                return faturas;
            }
            for (FaturasDadosDTO fatura : response.getDados()) {
                ConteudoDTO conteudoDTO = faturasClient.baixarFatura(token, fatura.getId().toString());
                if (conteudoDTO != null && conteudoDTO.getDados() != null) {
                    faturas.add(fattureWebUseCase.processarFaturas(conteudoDTO.getDados()));
                }
            }
        } catch (FeignException e) {
            if (e.status() == 404) {
                String responseBody = e.contentUTF8();
                if (responseBody != null && !responseBody.isEmpty()) {
                    if (!responseBody.contains("Faturas não encontradas.")) {
                        throw e;
                    }
                }
            } else {
                throw e;
            }
        } finally {
            logout(token);
        }
        return faturas;
    }

    public FaturaResponse processarFatura(String id) throws BusinessException {
        String token = login();
        try {
            ConteudoDTO conteudoDTO = faturasClient.baixarFatura(token, id);
            if (conteudoDTO != null && conteudoDTO.getDados() != null) {
                return fattureWebUseCase.processarFaturas(conteudoDTO.getDados());
            }
        } catch (FeignException e) {
            if (e.status() == 404) {
                String responseBody = e.contentUTF8();
                if (responseBody != null && !responseBody.isEmpty()) {
                    if (!responseBody.contains("Fatura não encontradas.")) {
                        throw e;
                    }
                }
            } else {
                throw e;
            }
        } finally {
            logout(token);
        }
        return null;
    }

    private String login() {
        AuthRequest request = new AuthRequest(email, senha);
        AuthResponse response = authClient.login(request);
        return response.getDados().get(0).getToken();
    }

    private void logout(String token) {
        authClient.logout(token);
    }

    private FattureWebProcessamento getUltimoProcessamento() {
        Optional<FattureWebProcessamento> last = fattureWebProcessamentoRepository.findLastByDataProcessamento("/FATURAS", "GET");
        if (last.isPresent()) {
            return last.get();
        }
        return null;
    }

    private FattureWebProcessamento saveUltimoProcessamento(LocalDateTime dataInicio, LocalDateTime dataFim,
                                                          String status, String erro, Integer totalProcessado, String correlationId) {
        FattureWebProcessamento p = new FattureWebProcessamento();
        p.setDataProcessamento(LocalDateTime.now());
        p.setPath("/FATURAS");
        p.setMethod("GET");
        p.setDataAtualizacaoInicio(dataInicio);
        p.setDataAtualizacaoFim(dataFim);
        p.setStatus(status);
        p.setErro(erro);
        p.setTotalProcessado(totalProcessado);
        p.setCorrelationId(correlationId);
        return fattureWebProcessamentoRepository.save(p);
    }

    private String formatarData(LocalDateTime localDateTime) {
        if (localDateTime == null) {
            return null;
        }
        ZoneOffset offset = ZoneOffset.of("-03:00");
        return localDateTime.atOffset(offset).format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss XXX"));
    }


}
