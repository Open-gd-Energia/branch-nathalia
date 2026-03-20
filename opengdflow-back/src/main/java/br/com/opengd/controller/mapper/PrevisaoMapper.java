package br.com.opengd.controller.mapper;

import br.com.opengd.controller.request.PrevisaoRequest;
import br.com.opengd.controller.response.PrevisaoResponse;
import br.com.opengd.entity.Previsao;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PrevisaoMapper {
    PrevisaoMapper INSTANCE = Mappers.getMapper(PrevisaoMapper.class);

    Previsao toEntity(PrevisaoRequest request);

    PrevisaoResponse toResponse(Previsao model);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.SET_TO_NULL)
    @Mapping(target = "usina", ignore = true)
    void updateEntityFromDto(PrevisaoRequest dto, @MappingTarget Previsao entity);

    List<PrevisaoResponse> toResponseList(List<Previsao> models);
}
