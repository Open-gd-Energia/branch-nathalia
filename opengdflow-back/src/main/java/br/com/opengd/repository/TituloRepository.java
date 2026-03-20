package br.com.opengd.repository;

import br.com.opengd.entity.Titulo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

public interface TituloRepository extends JpaRepository<Titulo, Long> {
    @Query("SELECT d FROM Titulo d " +
            "WHERE (:#{#params['idTipoDescontoItem']} IS NULL OR d.tipoDescontoItem.id = :#{#params['idTipoDescontoItem']}) " +
            "AND (:#{#params['idUsina']} IS NULL OR d.usina.id = :#{#params['idUsina']}) " +
            "AND (:#{#params['idConsumidor']} IS NULL OR d.consumidor.id = :#{#params['idConsumidor']}) " +
            "AND (:#{#params['identificador']} IS NULL OR LOWER(d.identificador) LIKE LOWER(CONCAT('%', :#{#params['identificador']}, '%'))) " +
            "AND (:#{#params['tipo']} IS NULL OR LOWER(d.tipo) LIKE LOWER(CONCAT('%', :#{#params['tipo']}, '%'))) " +
            "AND (:#{#params['referenciaInicial']} IS NULL OR d.mesReferencia >= FUNCTION('TO_DATE', :#{#params['referenciaInicial']}, 'YYYY-MM-DD')) " +
            "AND (:#{#params['referenciaFinal']} IS NULL OR d.mesReferencia <= FUNCTION('TO_DATE', :#{#params['referenciaFinal']}, 'YYYY-MM-DD')) " +
            "AND (:#{#params['status']} IS NULL OR LOWER(d.status) LIKE LOWER(CONCAT('%', :#{#params['status']}, '%'))) " +
            " ORDER BY d.identificador "
    )
    List<Titulo> findByDynamicQuery(@Param("params") Map<String, String> params);
}
