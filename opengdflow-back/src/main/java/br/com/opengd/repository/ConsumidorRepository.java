package br.com.opengd.repository;

import br.com.opengd.entity.Consumidor;
import br.com.opengd.enums.ConsumidorRepresentanteRelacaoTipo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

public interface ConsumidorRepository extends JpaRepository<Consumidor, Long> {
    @Query("SELECT c FROM Consumidor c " +
            "WHERE (:#{#params['uc']} IS NULL OR c.uc = :#{#params['uc']}) " +
            "AND (:#{#params['idDistribuidora']} IS NULL OR c.distribuidora.id = :#{#params['idDistribuidora']}) " +
            "AND (:#{#params['nome']} IS NULL OR LOWER(c.nome) LIKE LOWER(CONCAT('%', :#{#params['nome']}, '%'))) " +
            "AND (:#{#params['status']} IS NULL OR LOWER(c.status) LIKE LOWER(:#{#params['status']})) " +
            " ORDER BY c.nome "
    )
    List<Consumidor> findByDynamicQuery(@Param("params") Map<String, String> params);

    @Query("SELECT c FROM Consumidor c WHERE c.uc = :uc")
    Consumidor findFirstByUc(@Param("uc") String uc);

    @Query("SELECT c FROM Consumidor c " +
            "JOIN c.representantes cr " +
            "WHERE cr.representante.id = :idRepresentante " +
            "AND cr.relacao = :relacao ")
    List<Consumidor> findByRepresentanteIdAndRelacaoGestora(@Param("idRepresentante") Long idRepresentante, @Param("relacao") ConsumidorRepresentanteRelacaoTipo relacao);
}
