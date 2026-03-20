package br.com.opengd.controller.mapper;

import br.com.opengd.controller.request.BandeiraTarifariaRequest;
import br.com.opengd.controller.response.BandeiraTarifariaResponse;
import br.com.opengd.entity.BandeiraTarifaria;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface BandeiraTarifariaMapper {
    BandeiraTarifariaMapper INSTANCE = Mappers.getMapper(BandeiraTarifariaMapper.class);

    BandeiraTarifaria toEntity(BandeiraTarifariaRequest request);

    BandeiraTarifariaResponse toResponse(BandeiraTarifaria model);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.SET_TO_NULL)
    void updateEntityFromDto(BandeiraTarifariaRequest dto, @MappingTarget BandeiraTarifaria entity);

    List<BandeiraTarifariaResponse> toResponseList(List<BandeiraTarifaria> models);
}
