package br.com.opengd.repository;

import br.com.opengd.entity.BandeiraTarifaria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

public interface BandeiraTarifariaRepository extends JpaRepository<BandeiraTarifaria, Long> {
    @Query("SELECT p FROM BandeiraTarifaria p WHERE LOWER(p.nome) = LOWER(:nome) ORDER BY p.nome ")
    List<BandeiraTarifaria> findByNome(@Param("nome") String nome);

    @Query("SELECT c FROM BandeiraTarifaria c " +
            "WHERE (:#{#params['nome']} IS NULL OR LOWER(c.nome) LIKE LOWER(CONCAT('%', :#{#params['nome']}, '%'))) " +
            "AND (:#{#params['descricao']} IS NULL OR LOWER(c.descricao) LIKE LOWER(CONCAT('%', :#{#params['descricao']}, '%'))) " +
            " ORDER BY c.nome "
    )
    List<BandeiraTarifaria> findByDynamicQuery(@Param("params") Map<String, String> params);
}
