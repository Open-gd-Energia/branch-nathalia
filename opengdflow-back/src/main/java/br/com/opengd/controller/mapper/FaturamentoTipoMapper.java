package br.com.opengd.controller.mapper;

import br.com.opengd.controller.request.FaturamentoTipoRequest;
import br.com.opengd.controller.response.FaturamentoTipoResponse;
import br.com.opengd.entity.FaturamentoTipo;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface FaturamentoTipoMapper {
    FaturamentoTipoMapper INSTANCE = Mappers.getMapper(FaturamentoTipoMapper.class);

    FaturamentoTipo toEntity(FaturamentoTipoRequest request);

    FaturamentoTipoResponse toResponse(FaturamentoTipo model);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.SET_TO_NULL)
    void updateEntityFromDto(FaturamentoTipoRequest dto, @MappingTarget FaturamentoTipo entity);

    List<FaturamentoTipoResponse> toResponseList(List<FaturamentoTipo> models);
}
