package br.com.opengd.exception;

public class BusinessException extends Exception {

    public BusinessException(String mensagem) {
        super(mensagem);
    }

    public BusinessException(String mensagem, Throwable cause) {
        super(mensagem, cause);
    }
}
