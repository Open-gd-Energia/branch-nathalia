package br.com.opengd.controller.mapper;

import br.com.opengd.controller.request.RegraTarifariaRequest;
import br.com.opengd.controller.response.RegraTarifariaResponse;
import br.com.opengd.entity.RegraTarifaria;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface RegraTarifariaMapper {
    RegraTarifariaMapper INSTANCE = Mappers.getMapper(RegraTarifariaMapper.class);

    RegraTarifaria toEntity(RegraTarifariaRequest request);

    RegraTarifariaResponse toResponse(RegraTarifaria model);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.SET_TO_NULL)
    void updateEntityFromDto(RegraTarifariaRequest dto, @MappingTarget RegraTarifaria entity);

    List<RegraTarifariaResponse> toResponseList(List<RegraTarifaria> models);
}
