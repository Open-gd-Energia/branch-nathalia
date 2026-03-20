package br.com.opengd.usecase;

import br.com.opengd.controller.request.CidadeRequest;
import br.com.opengd.controller.response.CidadeResponse;
import br.com.opengd.entity.Cidade;
import br.com.opengd.exception.BusinessException;

import java.util.List;
import java.util.Map;

public interface CidadeUseCase {
    CidadeResponse create(CidadeRequest request) throws BusinessException;

    List<CidadeResponse> findByAttributes(Map<String, String> params);

    CidadeResponse update(Long id, CidadeRequest request) throws BusinessException;

    Boolean delete(Long id) throws BusinessException;

    CidadeResponse get(Long id) throws BusinessException;

    Cidade findOrCreate(CidadeRequest request);
}
