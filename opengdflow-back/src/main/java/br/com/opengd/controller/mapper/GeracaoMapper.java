package br.com.opengd.controller.mapper;

import br.com.opengd.controller.request.GeracaoRequest;
import br.com.opengd.controller.response.GeracaoResponse;
import br.com.opengd.entity.Geracao;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface GeracaoMapper {
    GeracaoMapper INSTANCE = Mappers.getMapper(GeracaoMapper.class);

    Geracao toEntity(GeracaoRequest request);

    GeracaoResponse toResponse(Geracao model);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.SET_TO_NULL)
    @Mapping(target = "usina", ignore = true)
    void updateEntityFromDto(GeracaoRequest dto, @MappingTarget Geracao entity);

    List<GeracaoResponse> toResponseList(List<Geracao> models);
}
