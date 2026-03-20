package br.com.opengd.repository;

import br.com.opengd.entity.Usina;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

public interface UsinaRepository extends JpaRepository<Usina, Long> {
    @Query("SELECT c FROM Usina c " +
            "WHERE (:#{#params['nome']} IS NULL OR LOWER(c.nome) LIKE LOWER(CONCAT('%', :#{#params['nome']}, '%'))) " +
            " AND (:#{#params['uc']} IS NULL OR LOWER(c.uc) = LOWER(:#{#params['uc']})) " +
            " AND (:#{#params['status']} IS NULL OR LOWER(c.status) LIKE LOWER(:#{#params['status']})) " +
            " ORDER BY c.nome"
    )
    List<Usina> findByDynamicQuery(@Param("params") Map<String, String> params);

    @Query("SELECT u FROM Usina u WHERE u.distribuidora.id = :idDistribuidora")
    List<Usina> findByIdDistribuidora(@Param("idDistribuidora") Long idDistribuidora);

    @Query("SELECT u FROM Usina u " +
            "JOIN u.representantes ur " +
            "WHERE ur.representante.id = :idRepresentante")
    List<Usina> findByIdRepresentante(@Param("idRepresentante") Long idRepresentante);

    @Query("SELECT SUM(ai.quota) FROM AlocacaoItem ai " +
            "INNER JOIN ai.alocacao al " +
            "WHERE al.usina.id = :idUsina " +
            "and al.status = 'ATIVO' " +
            "and (al.dataFinal IS NULL OR al.dataFinal > CURRENT_DATE)")
    BigDecimal calculateCotaAlocada(@Param("idUsina") Long idUsina);
}
