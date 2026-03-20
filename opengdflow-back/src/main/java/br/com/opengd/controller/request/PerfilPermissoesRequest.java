package br.com.opengd.controller.request;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PerfilPermissoesRequest {
    private List<Long> permissoes;
}
