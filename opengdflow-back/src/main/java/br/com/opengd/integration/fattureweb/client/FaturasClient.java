package br.com.opengd.integration.fattureweb.client;


import br.com.opengd.integration.fattureweb.dto.conteudo.ConteudoDTO;
import br.com.opengd.integration.fattureweb.dto.fatura.FaturasDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "faturaClient", url = "https://api.fattureweb.com.br")
public interface FaturasClient {

    @GetMapping(value = "/faturas", headers = "Content-Type=application/json")
    FaturasDTO listarFaturas(@RequestHeader("Fatture-AuthToken") String token,
                             @RequestHeader("limit") Long limit,
                             @RequestHeader("skip") Long skip,
                             @RequestParam(value = "data_atualizacao_inicio", required = false) String dataAtualizacaoInicio,
                             @RequestParam(value = "data_atualizacao_fim", required = false) String dataAtualizacaoFim);

    @GetMapping(value = "/faturas/{idFatura}/conteudo", headers = "Content-Type=application/json")
    ConteudoDTO baixarFatura(@RequestHeader("Fatture-AuthToken") String token, @PathVariable("idFatura") String idFatura);
}
