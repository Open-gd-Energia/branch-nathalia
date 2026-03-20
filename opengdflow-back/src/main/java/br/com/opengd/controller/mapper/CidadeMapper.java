package br.com.opengd.controller.mapper;

import br.com.opengd.controller.request.CidadeRequest;
import br.com.opengd.controller.response.CidadeResponse;
import br.com.opengd.entity.Cidade;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CidadeMapper {
    CidadeMapper INSTANCE = Mappers.getMapper(CidadeMapper.class);

    Cidade toEntity(CidadeRequest request);

    CidadeResponse toResponse(Cidade model);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.SET_TO_NULL)
    void updateEntityFromDto(CidadeRequest dto, @MappingTarget Cidade entity);

    List<CidadeResponse> toResponseList(List<Cidade> models);
}
