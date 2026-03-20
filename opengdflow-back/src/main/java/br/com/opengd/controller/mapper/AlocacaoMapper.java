package br.com.opengd.controller.mapper;

import br.com.opengd.controller.request.AlocacaoRequest;
import br.com.opengd.controller.response.AlocacaoResponse;
import br.com.opengd.entity.Alocacao;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AlocacaoMapper {
    AlocacaoMapper INSTANCE = Mappers.getMapper(AlocacaoMapper.class);

    Alocacao toEntity(AlocacaoRequest request);

    AlocacaoResponse toResponse(Alocacao model);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.SET_TO_NULL)
    @Mapping(target = "usina", ignore = true)
    void updateEntityFromDto(AlocacaoRequest dto, @MappingTarget Alocacao entity);

    List<AlocacaoResponse> toResponseList(List<Alocacao> models);
}
