package br.com.opengd.controller.mapper;

import br.com.opengd.controller.request.TituloRequest;
import br.com.opengd.controller.response.TituloResponse;
import br.com.opengd.entity.Titulo;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TituloMapper {
    TituloMapper INSTANCE = Mappers.getMapper(TituloMapper.class);

    Titulo toEntity(TituloRequest request);

    TituloResponse toResponse(Titulo model);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.SET_TO_NULL)
    @Mapping(target = "tipoDescontoItem", ignore = true)
    @Mapping(target = "usina", ignore = true)
    @Mapping(target = "consumidor", ignore = true)
    @Mapping(target = "itens", ignore = true)
    void updateEntityFromDto(TituloRequest dto, @MappingTarget Titulo entity);


    List<TituloResponse> toResponseList(List<Titulo> models);
}
