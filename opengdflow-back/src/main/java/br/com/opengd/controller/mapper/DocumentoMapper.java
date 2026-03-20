package br.com.opengd.controller.mapper;

import br.com.opengd.controller.request.DocumentoRequest;
import br.com.opengd.controller.response.DocumentoFileResponse;
import br.com.opengd.controller.response.DocumentoResponse;
import br.com.opengd.entity.Documento;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface DocumentoMapper {
    DocumentoMapper INSTANCE = Mappers.getMapper(DocumentoMapper.class);

    Documento toEntity(DocumentoRequest request);

    DocumentoResponse toResponse(Documento model);

    DocumentoFileResponse toResponseFile(Documento model);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.SET_TO_NULL)
    @Mapping(target = "usina", ignore = true)
    @Mapping(target = "consumidor", ignore = true)
    @Mapping(target = "representante", ignore = true)
    @Mapping(target = "usuario", ignore = true)
    void updateEntityFromDto(DocumentoRequest dto, @MappingTarget Documento entity);

    List<DocumentoResponse> toResponseList(List<Documento> models);
}
