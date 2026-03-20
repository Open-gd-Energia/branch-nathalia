package br.com.opengd.usecase;

import br.com.opengd.controller.request.BandeiraTarifariaRequest;
import br.com.opengd.controller.response.BandeiraTarifariaResponse;
import br.com.opengd.exception.BusinessException;

import java.util.List;
import java.util.Map;

public interface BandeiraTarifariaUseCase {
    BandeiraTarifariaResponse create(BandeiraTarifariaRequest request) throws BusinessException;

    List<BandeiraTarifariaResponse> findByAttributes(Map<String, String> params);

    BandeiraTarifariaResponse update(Long id, BandeiraTarifariaRequest request) throws BusinessException;

    Boolean delete(Long id) throws BusinessException;

    BandeiraTarifariaResponse get(Long id) throws BusinessException;
}
