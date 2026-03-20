package br.com.opengd.controller.mapper;

import br.com.opengd.controller.request.IrradiacaoRequest;
import br.com.opengd.controller.response.IrradiacaoResponse;
import br.com.opengd.entity.Irradiacao;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface IrradiacaoMapper {
    IrradiacaoMapper INSTANCE = Mappers.getMapper(IrradiacaoMapper.class);

    Irradiacao toEntity(IrradiacaoRequest request);

    IrradiacaoResponse toResponse(Irradiacao model);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.SET_TO_NULL)
    @Mapping(target = "usina", ignore = true)
    void updateEntityFromDto(IrradiacaoRequest dto, @MappingTarget Irradiacao entity);

    List<IrradiacaoResponse> toResponseList(List<Irradiacao> models);
}
