package br.com.opengd.controller.mapper;

import br.com.opengd.controller.request.PerfilRequest;
import br.com.opengd.controller.response.PerfilPermissoesResponse;
import br.com.opengd.controller.response.PerfilResponse;
import br.com.opengd.entity.Perfil;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PerfilMapper {
    PerfilMapper INSTANCE = Mappers.getMapper(PerfilMapper.class);

    Perfil toEntity(PerfilRequest request);

    PerfilResponse toResponse(Perfil model);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.SET_TO_NULL)
    @Mapping(target = "permissoes", ignore = true)
    void updateEntityFromDto(PerfilRequest dto, @MappingTarget Perfil entity);

    PerfilPermissoesResponse toPerfilPermissaoResponse(Perfil model);

    List<PerfilResponse> toResponseList(List<Perfil> models);
}


