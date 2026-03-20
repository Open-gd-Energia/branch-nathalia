package br.com.opengd.controller.mapper;

import br.com.opengd.controller.request.ContaRequest;
import br.com.opengd.controller.response.ContaResponse;
import br.com.opengd.entity.Conta;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ContaMapper {
    ContaMapper INSTANCE = Mappers.getMapper(ContaMapper.class);

    Conta toEntity(ContaRequest request);

    ContaResponse toResponse(Conta model);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.SET_TO_NULL)
    @Mapping(target = "banco", ignore = true)
    void updateEntityFromDto(ContaRequest dto, @MappingTarget Conta entity);

    List<ContaResponse> toResponseList(List<Conta> models);
}
