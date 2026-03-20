package br.com.opengd.controller.mapper;

import br.com.opengd.controller.request.BancoRequest;
import br.com.opengd.controller.response.BancoResponse;
import br.com.opengd.entity.Banco;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface BancoMapper {
    BancoMapper INSTANCE = Mappers.getMapper(BancoMapper.class);

    Banco toEntity(BancoRequest request);

    BancoResponse toResponse(Banco model);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.SET_TO_NULL)
    void updateEntityFromDto(BancoRequest dto, @MappingTarget Banco entity);

    List<BancoResponse> toResponseList(List<Banco> models);
}
