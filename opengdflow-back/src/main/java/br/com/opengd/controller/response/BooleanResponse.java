package br.com.opengd.controller.response;


import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonInclude
public class BooleanResponse {
    private String mensage;

    public BooleanResponse(String mensage) {
        this.mensage = mensage;
    }
}
