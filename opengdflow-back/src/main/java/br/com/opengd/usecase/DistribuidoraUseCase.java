package br.com.opengd.usecase;

import br.com.opengd.controller.request.DistribuidoraRequest;
import br.com.opengd.controller.response.DistribuidoraResponse;
import br.com.opengd.entity.Distribuidora;
import br.com.opengd.exception.BusinessException;

import java.util.List;
import java.util.Map;

public interface DistribuidoraUseCase {
    DistribuidoraResponse create(DistribuidoraRequest request) throws BusinessException;

    List<DistribuidoraResponse> findByAttributes(Map<String, String> params);

    DistribuidoraResponse update(Long id, DistribuidoraRequest request) throws BusinessException;

    Boolean delete(Long id) throws BusinessException;

    DistribuidoraResponse get(Long id) throws BusinessException;

    Distribuidora getDistribuidoraByCnpjOrName(String cnpj, String nome) throws BusinessException;
}
