package br.com.opengd.controller.mapper;

import br.com.opengd.controller.request.FaturaRequest;
import br.com.opengd.controller.response.FaturaResponse;
import br.com.opengd.entity.Fatura;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface FaturaMapper {
    FaturaMapper INSTANCE = Mappers.getMapper(FaturaMapper.class);

    Fatura toEntity(FaturaRequest request);

    FaturaResponse toResponse(Fatura model);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.SET_TO_NULL)
    @Mapping(target = "bandeiraTarifaria", ignore = true)
    @Mapping(target = "usina", ignore = true)
    @Mapping(target = "consumidor", ignore = true)
    @Mapping(target = "historicoFaturamentos", ignore = true)
    void updateEntityFromDto(FaturaRequest dto, @MappingTarget Fatura entity);

    List<FaturaResponse> toResponseList(List<Fatura> models);
}
