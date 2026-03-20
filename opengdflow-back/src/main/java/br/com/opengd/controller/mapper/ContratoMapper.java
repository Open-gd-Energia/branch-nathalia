package br.com.opengd.controller.mapper;

import br.com.opengd.controller.request.ContratoRequest;
import br.com.opengd.controller.response.ContratoResponse;
import br.com.opengd.entity.Contrato;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ContratoMapper {
    ContratoMapper INSTANCE = Mappers.getMapper(ContratoMapper.class);

    Contrato toEntity(ContratoRequest request);

    ContratoResponse toResponse(Contrato model);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.SET_TO_NULL)
    @Mapping(target = "usina", ignore = true)
    void updateEntityFromDto(ContratoRequest dto, @MappingTarget Contrato entity);

    List<ContratoResponse> toResponseList(List<Contrato> models);
}
