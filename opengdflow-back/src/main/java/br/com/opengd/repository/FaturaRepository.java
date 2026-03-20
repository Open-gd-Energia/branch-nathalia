package br.com.opengd.repository;

import br.com.opengd.entity.Fatura;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

public interface FaturaRepository extends JpaRepository<Fatura, Long> {
    @Query("SELECT d FROM Fatura d " +
            "LEFT JOIN d.usina usina " +
            "LEFT JOIN d.consumidor consumidor " +
            "WHERE (:#{#params['nomeUsina']} IS NULL OR LOWER(usina.nome) LIKE LOWER(CONCAT('%', :#{#params['nomeUsina']}, '%'))) " +
            "AND (:#{#params['nomeConsumidor']} IS NULL OR LOWER(consumidor.nome) LIKE LOWER(CONCAT('%', :#{#params['nomeConsumidor']}, '%'))) " +
            "AND (:#{#params['ucUsina']} IS NULL OR LOWER(usina.uc) LIKE LOWER(CONCAT('%', :#{#params['ucUsina']}, '%'))) " +
            "AND (:#{#params['ucConsumidor']} IS NULL OR LOWER(consumidor.uc) LIKE LOWER(CONCAT('%', :#{#params['ucConsumidor']}, '%'))) " +
            "AND (:#{#params['referenciaInicial']} IS NULL OR d.mesReferencia >= FUNCTION('TO_DATE', :#{#params['referenciaInicial']}, 'YYYY-MM-DD')) " +
            "AND (:#{#params['referenciaFinal']} IS NULL OR d.mesReferencia <= FUNCTION('TO_DATE', :#{#params['referenciaFinal']}, 'YYYY-MM-DD')) " +
            "AND (:#{#params['vencimentoInicial']} IS NULL OR d.vencimento >= FUNCTION('TO_DATE', :#{#params['vencimentoInicial']}, 'YYYY-MM-DD')) " +
            "AND (:#{#params['vencimentoFinal']} IS NULL OR d.vencimento <= FUNCTION('TO_DATE', :#{#params['vencimentoFinal']}, 'YYYY-MM-DD')) " +
            "AND (:#{#params['status']} IS NULL OR LOWER(d.status) LIKE LOWER(CONCAT('%', :#{#params['status']}, '%'))) " +
            "ORDER BY d.mesReferencia desc"
    )
    List<Fatura> findByDynamicQuery(@Param("params") Map<String, String> params);

    @Query("SELECT f FROM Fatura f " +
            "INNER JOIN f.usina u " +
            "WHERE u.id = :idUsina " +
            "ORDER BY f.mesReferencia DESC")
    List<Fatura> findByUsina(@Param("idUsina") Long idUsina, Pageable pageable);

    @Query("SELECT f FROM Fatura f " +
            "INNER JOIN f.consumidor c " +
            "WHERE c.id = :idConsumidor " +
            "ORDER BY f.mesReferencia DESC")
    List<Fatura> findByConsumidor(@Param("idConsumidor") Long idConsumidor, Pageable pageable);
}
