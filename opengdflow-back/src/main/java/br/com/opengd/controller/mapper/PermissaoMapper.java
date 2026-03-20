package br.com.opengd.controller.mapper;

import br.com.opengd.controller.request.PermissaoRequest;
import br.com.opengd.controller.response.PermissaoResponse;
import br.com.opengd.entity.Permissao;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PermissaoMapper {
    PermissaoMapper INSTANCE = Mappers.getMapper(PermissaoMapper.class);

    Permissao toEntity(PermissaoRequest request);

    PermissaoResponse toResponse(Permissao model);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.SET_TO_NULL)
    void updateEntityFromDto(PermissaoRequest dto, @MappingTarget Permissao entity);

    List<PermissaoResponse> toResponseList(List<Permissao> models);
}
