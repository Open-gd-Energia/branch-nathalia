package br.com.opengd.usecase;

import br.com.opengd.controller.request.FaturaRequest;
import br.com.opengd.controller.response.FaturaResponse;
import br.com.opengd.entity.FattureWeb;
import br.com.opengd.exception.BusinessException;

import java.util.List;
import java.util.Map;

public interface FaturaUseCase {
    FaturaResponse create(FaturaRequest request, FattureWeb fattureWeb) throws BusinessException;

    List<FaturaResponse> findByAttributes(Map<String, String> params);

    FaturaResponse update(Long id, FaturaRequest request) throws BusinessException;

    Boolean delete(Long id) throws BusinessException;

    FaturaResponse get(Long id) throws BusinessException;
}
