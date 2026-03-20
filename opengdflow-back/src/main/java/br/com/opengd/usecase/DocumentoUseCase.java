package br.com.opengd.usecase;

import br.com.opengd.controller.request.DocumentoRequest;
import br.com.opengd.controller.response.DocumentoFileResponse;
import br.com.opengd.controller.response.DocumentoResponse;
import br.com.opengd.exception.BusinessException;

import java.util.List;
import java.util.Map;

public interface DocumentoUseCase {
    DocumentoResponse create(DocumentoRequest request) throws BusinessException;

    List<DocumentoResponse> findByAttributes(Map<String, String> params);

    DocumentoResponse update(Long id, DocumentoRequest request) throws BusinessException;

    Boolean delete(Long id) throws BusinessException;

    DocumentoFileResponse get(Long id) throws BusinessException;
}
