package br.com.opengd.controller.mapper;

import br.com.opengd.controller.request.RepresentanteRequest;
import br.com.opengd.controller.response.RepresentanteResponse;
import br.com.opengd.entity.Representante;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface RepresentanteMapper {
    RepresentanteMapper INSTANCE = Mappers.getMapper(RepresentanteMapper.class);

    Representante toEntity(RepresentanteRequest request);

    RepresentanteResponse toResponse(Representante model);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.SET_TO_NULL)
    @Mapping(target = "endereco.cidade", ignore = true)
    @Mapping(target = "consumidores", ignore = true)
    @Mapping(target = "usinas", ignore = true)
    void updateEntityFromDto(RepresentanteRequest dto, @MappingTarget Representante entity);

    List<RepresentanteResponse> toResponseList(List<Representante> models);
}
