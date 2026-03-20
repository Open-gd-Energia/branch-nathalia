package br.com.opengd.controller.mapper;

import br.com.opengd.controller.request.EnderecoRequest;
import br.com.opengd.controller.response.EnderecoResponse;
import br.com.opengd.entity.Endereco;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface EnderecoMapper {
    EnderecoMapper INSTANCE = Mappers.getMapper(EnderecoMapper.class);

    @Mapping(target = "cidade", ignore = true)
    Endereco toEntity(EnderecoRequest request);

    EnderecoResponse toResponse(Endereco model);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.SET_TO_NULL)
    @Mapping(target = "cidade", ignore = true)
    void updateEntityFromDto(EnderecoRequest dto, @MappingTarget Endereco entity);

    List<EnderecoResponse> toResponseList(List<Endereco> models);
}
