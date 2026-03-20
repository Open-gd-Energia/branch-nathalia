package br.com.opengd.controller.mapper;

import br.com.opengd.controller.request.ConsumidorRequest;
import br.com.opengd.controller.response.ConsumidorResponse;
import br.com.opengd.entity.Consumidor;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ConsumidorMapper {
    ConsumidorMapper INSTANCE = Mappers.getMapper(ConsumidorMapper.class);

    Consumidor toEntity(ConsumidorRequest request);

    ConsumidorResponse toResponse(Consumidor model);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.SET_TO_NULL)
    @Mapping(target = "endereco.cidade", ignore = true)
    @Mapping(target = "distribuidora", ignore = true)
    @Mapping(target = "representantes", ignore = true)
    @Mapping(target = "representanteTitular", ignore = true)
    void updateEntityFromDto(ConsumidorRequest dto, @MappingTarget Consumidor entity);

    List<ConsumidorResponse> toResponseList(List<Consumidor> models);
}
