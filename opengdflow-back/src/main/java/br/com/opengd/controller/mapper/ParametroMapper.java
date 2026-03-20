package br.com.opengd.controller.mapper;

import br.com.opengd.controller.request.ParametroRequest;
import br.com.opengd.controller.response.ParametroResponse;
import br.com.opengd.entity.Parametro;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ParametroMapper {
    ParametroMapper INSTANCE = Mappers.getMapper(ParametroMapper.class);

    Parametro toEntity(ParametroRequest request);

    ParametroResponse toResponse(Parametro model);

    List<ParametroResponse> toResponseList(List<Parametro> models);
}
