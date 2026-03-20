package br.com.opengd.controller.mapper;

import br.com.opengd.controller.request.UsuarioLogRequest;
import br.com.opengd.controller.response.UsuarioLogResponse;
import br.com.opengd.entity.UsuarioLog;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UsuarioLogMapper {
    UsuarioLogMapper INSTANCE = Mappers.getMapper(UsuarioLogMapper.class);

    UsuarioLog toEntity(UsuarioLogRequest request);

    UsuarioLogResponse toResponse(UsuarioLog model);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.SET_TO_NULL)
    @Mapping(target = "usuario", ignore = true)
    void updateEntityFromDto(UsuarioLogRequest dto, @MappingTarget UsuarioLog entity);


    List<UsuarioLogResponse> toResponseList(List<UsuarioLog> models);
}

