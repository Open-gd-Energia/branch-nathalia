package br.com.opengd.repository;

import br.com.opengd.entity.AlocacaoItem;
import br.com.opengd.entity.AlocacaoItemId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

public interface AlocacaoItemRepository extends JpaRepository<AlocacaoItem, AlocacaoItemId> {
    @Query("SELECT i FROM AlocacaoItem i " +
            " LEFT JOIN i.alocacao a " +
            " LEFT JOIN i.consumidor c " +
            " LEFT JOIN a.usina u " +
            " WHERE (:#{#params['idConsumidor']} IS NULL OR c.id = :#{#params['idConsumidor']}) " +
            " and (:#{#params['idUsina']} IS NULL OR u.id = :#{#params['idUsina']}) " +
            " and (:#{#params['nomeUsina']} IS NULL OR LOWER(u.nome) LIKE LOWER(CONCAT('%', :#{#params['nomeUsina']}, '%'))) " +
            " and (:#{#params['nomeConsumidor']} IS NULL OR LOWER(c.nome) LIKE LOWER(CONCAT('%', :#{#params['nomeConsumidor']}, '%'))) " +
            " AND (:#{#params['statusAlocacao']} IS NULL OR LOWER(a.status) LIKE LOWER(:#{#params['statusAlocacao']})) "
    )
    List<AlocacaoItem> findByDynamicQuery(@Param("params") Map<String, String> params);

    @Query("SELECT i FROM AlocacaoItem i " +
            "LEFT JOIN i.alocacao a " +
            "WHERE a.usina.id = :idUsina " +
            "AND (CURRENT_DATE BETWEEN a.dataInicio AND a.dataFinal) " +
            "AND a.status = 'ATIVO'")
    List<AlocacaoItem> findVigentesByUsina(@Param("idUsina") Long idUsina);
}