package br.com.opengd.controller.mapper;

import br.com.opengd.controller.request.DistribuidoraRequest;
import br.com.opengd.controller.response.DistribuidoraResponse;
import br.com.opengd.entity.Distribuidora;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface DistribuidoraMapper {
    DistribuidoraMapper INSTANCE = Mappers.getMapper(DistribuidoraMapper.class);

    Distribuidora toEntity(DistribuidoraRequest request);

    DistribuidoraResponse toResponse(Distribuidora model);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.SET_TO_NULL)
    void updateEntityFromDto(DistribuidoraRequest dto, @MappingTarget Distribuidora entity);

    List<DistribuidoraResponse> toResponseList(List<Distribuidora> models);
}
