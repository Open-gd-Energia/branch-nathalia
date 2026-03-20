package br.com.opengd.service;

import br.com.opengd.entity.Titulo;
import br.com.opengd.exception.BusinessException;
import br.com.opengd.integration.sicoob.dto.SicoobBoletoRequest;
import br.com.opengd.integration.sicoob.dto.SicoobBoletoResponse;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Service
public class BoletoService {

    public SicoobBoletoResponse emitirSicoob(Titulo titulo) throws BusinessException {
        SicoobBoletoRequest sicoobBoletoRequest = new SicoobBoletoRequest();
        sicoobBoletoRequest.setDataEmissao(LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")));
        sicoobBoletoRequest.setDataVencimento(titulo.getDataVencimento().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")));
        sicoobBoletoRequest.setValor(titulo.getValorTotal());

        SicoobBoletoResponse.Resultado resultado = new SicoobBoletoResponse.Resultado();
        resultado.setIdentificacaoEmissaoBoleto(1234567890);
        resultado.setCodigoBarras("75691X10000000015001234567890123456789012345");
        SicoobBoletoResponse sicoobBoletoResponse = new SicoobBoletoResponse();
        sicoobBoletoResponse.setResultado(resultado);
        return sicoobBoletoResponse;
    }
}
