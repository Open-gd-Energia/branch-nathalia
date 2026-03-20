package br.com.opengd.controller.mapper;

import br.com.opengd.controller.request.TipoDescontoRequest;
import br.com.opengd.controller.response.TipoDescontoResponse;
import br.com.opengd.entity.TipoDesconto;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TipoDescontoMapper {
    TipoDescontoMapper INSTANCE = Mappers.getMapper(TipoDescontoMapper.class);

    TipoDesconto toEntity(TipoDescontoRequest request);

    TipoDescontoResponse toResponse(TipoDesconto model);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.SET_TO_NULL)
    void updateEntityFromDto(TipoDescontoRequest dto, @MappingTarget TipoDesconto entity);


    List<TipoDescontoResponse> toResponseList(List<TipoDesconto> models);
}
