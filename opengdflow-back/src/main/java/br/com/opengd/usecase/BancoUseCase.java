package br.com.opengd.usecase;

import br.com.opengd.controller.request.BancoRequest;
import br.com.opengd.controller.response.BancoResponse;
import br.com.opengd.exception.BusinessException;

import java.util.List;
import java.util.Map;

public interface BancoUseCase {
    BancoResponse create(BancoRequest request) throws BusinessException;

    List<BancoResponse> findByAttributes(Map<String, String> params);

    BancoResponse update(Long id, BancoRequest request) throws BusinessException;

    Boolean delete(Long id) throws BusinessException;

    BancoResponse get(Long id) throws BusinessException;
}
