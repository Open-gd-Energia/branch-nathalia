package br.com.opengd.repository;

import br.com.opengd.entity.RegraTarifaria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

public interface RegraTarifariaRepository extends JpaRepository<RegraTarifaria, Long> {
    @Query("SELECT p FROM RegraTarifaria p WHERE LOWER(p.nome) = LOWER(:name) ORDER BY p.nome ")
    List<RegraTarifaria> findByNome(@Param("name") String name);

    @Query("SELECT c FROM RegraTarifaria c " +
            "WHERE (:#{#params['nome']} IS NULL OR LOWER(c.nome) LIKE LOWER(CONCAT('%', :#{#params['nome']}, '%'))) " +
            "AND (:#{#params['descricao']} IS NULL OR LOWER(c.descricao) LIKE LOWER(CONCAT('%', :#{#params['descricao']}, '%'))) " +
            " ORDER BY c.nome, c.id "
    )
    List<RegraTarifaria> findByDynamicQuery(@Param("params") Map<String, String> params);
}
