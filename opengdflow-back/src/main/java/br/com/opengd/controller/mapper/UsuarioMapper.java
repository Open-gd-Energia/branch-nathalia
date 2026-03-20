package br.com.opengd.controller.mapper;

import br.com.opengd.controller.request.UsuarioRequest;
import br.com.opengd.controller.response.UsuarioPerfilsResponse;
import br.com.opengd.controller.response.UsuarioResponse;
import br.com.opengd.entity.Usuario;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UsuarioMapper {
    UsuarioMapper INSTANCE = Mappers.getMapper(UsuarioMapper.class);

    Usuario toEntity(UsuarioRequest request);

    UsuarioResponse toResponse(Usuario model);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.SET_TO_NULL)
    @Mapping(target = "perfil", ignore = true)
    @Mapping(target = "consumidores", ignore = true)
    @Mapping(target = "usinas", ignore = true)
    void updateEntityFromDto(UsuarioRequest dto, @MappingTarget Usuario entity);

    List<UsuarioResponse> toResponseList(List<Usuario> models);

    UsuarioPerfilsResponse toUsuarioPerfilsResponse(Usuario model);
}
