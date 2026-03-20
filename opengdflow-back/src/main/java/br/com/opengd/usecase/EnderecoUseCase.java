package br.com.opengd.usecase;

import br.com.opengd.controller.request.EnderecoRequest;
import br.com.opengd.controller.response.EnderecoResponse;
import br.com.opengd.exception.BusinessException;

import java.util.List;

public interface EnderecoUseCase {
    EnderecoResponse create(EnderecoRequest request) throws BusinessException;

    List<EnderecoResponse> findAll();

    EnderecoResponse update(Long id, EnderecoRequest request) throws BusinessException;

    Boolean delete(Long id) throws BusinessException;

    EnderecoResponse get(Long id) throws BusinessException;
}
