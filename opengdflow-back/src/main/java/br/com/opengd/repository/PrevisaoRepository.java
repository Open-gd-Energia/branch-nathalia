package br.com.opengd.repository;

import br.com.opengd.entity.Previsao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

public interface PrevisaoRepository extends JpaRepository<Previsao, Long> {
    @Query("SELECT i FROM Previsao i " +
            " WHERE (:#{#params['idUsina']} IS NULL OR i.usina.id = :#{#params['idUsina']}) " +
            " AND (:#{#params['mesReferencia']} IS NULL OR i.mesReferencia = FUNCTION('TO_DATE', :#{#params['mesReferencia']}, 'YYYY-MM-DD')) " +
            " ORDER BY i.id desc "
    )
    List<Previsao> findByDynamicQuery(@Param("params") Map<String, String> params);
}
