package br.com.opengd.repository;

import br.com.opengd.entity.Alocacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

public interface AlocacaoRepository extends JpaRepository<Alocacao, Long> {
    @Query("SELECT c FROM Alocacao c " +
            "WHERE (:#{#params['idUsina']} IS NULL OR c.usina.id = :#{#params['idUsina']}) " +
            "AND (:#{#params['dataInicio']} IS NULL OR c.dataInicio >= :#{#params['dataInicio']}) " +
            "AND (:#{#params['dataFinal']} IS NULL OR c.dataFinal <= :#{#params['dataFinal']}) " +
            "AND (:#{#params['status']} IS NULL OR LOWER(c.status) LIKE LOWER(:#{#params['status']})) " +
            "ORDER BY c.dataInicio "
    )
    List<Alocacao> findByDynamicQuery(@Param("params") Map<String, String> params);

    @Query("SELECT a FROM Alocacao a WHERE a.usina.id = :idUsina AND a.dataFinal IS NULL")
    List<Alocacao> findByUsinaIdAndDataFinalIsNull(@Param("idUsina") Long idUsina);
}