package br.com.opengd.controller.mapper;

import br.com.opengd.controller.request.UsinaRequest;
import br.com.opengd.controller.response.UsinaResponse;
import br.com.opengd.entity.Usina;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UsinaMapper {
    UsinaMapper INSTANCE = Mappers.getMapper(UsinaMapper.class);

    Usina toEntity(UsinaRequest request);

    UsinaResponse toResponse(Usina model);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.SET_TO_NULL)
    @Mapping(target = "conta.banco", ignore = true)
    @Mapping(target = "endereco.cidade", ignore = true)
    @Mapping(target = "faturamentoTipo", ignore = true)
    @Mapping(target = "regraTarifaria", ignore = true)
    @Mapping(target = "distribuidora", ignore = true)
    @Mapping(target = "representanteTitular", ignore = true)
    @Mapping(target = "representantes.representante", ignore = true)
    void updateEntityFromDto(UsinaRequest dto, @MappingTarget Usina entity);

    List<UsinaResponse> toResponseList(List<Usina> models);
}
