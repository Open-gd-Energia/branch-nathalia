package br.com.opengd.controller.mapper;

import br.com.opengd.controller.request.AlocacaoItemRequest;
import br.com.opengd.controller.response.AlocacaoItemResponse;
import br.com.opengd.entity.AlocacaoItem;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AlocacaoItemMapper {
    AlocacaoItemMapper INSTANCE = Mappers.getMapper(AlocacaoItemMapper.class);

    AlocacaoItem toEntity(AlocacaoItemRequest request);

    AlocacaoItemResponse toResponse(AlocacaoItem model);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.SET_TO_NULL)
    @Mapping(target = "consumidor", ignore = true)
    void updateEntityFromDto(AlocacaoItemRequest dto, @MappingTarget AlocacaoItem entity);

    List<AlocacaoItemResponse> toResponseList(List<AlocacaoItem> models);
}
