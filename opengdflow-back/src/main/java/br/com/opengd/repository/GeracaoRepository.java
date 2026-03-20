package br.com.opengd.repository;

import br.com.opengd.entity.Geracao;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

public interface GeracaoRepository extends JpaRepository<Geracao, Long> {
    @Query("SELECT i FROM Geracao i " +
            "WHERE (:#{#params['idUsina']} IS NULL OR i.usina.id = :#{#params['idUsina']}) " +
            " AND (:#{#params['mesReferencia']} IS NULL OR i.mesReferencia = FUNCTION('TO_DATE', :#{#params['mesReferencia']}, 'YYYY-MM-DD')) " +
            " ORDER BY i.mesReferencia asc "
    )
    List<Geracao> findByDynamicQuery(@Param("params") Map<String, String> params);


    @Query("SELECT f FROM Geracao f " +
            "JOIN f.usina u " +
            "WHERE u.id = :idUsina " +
            "ORDER BY f.mesReferencia DESC")
    List<Geracao> findByUsina(@Param("idUsina") Long idUsina, Pageable pageable);
}
