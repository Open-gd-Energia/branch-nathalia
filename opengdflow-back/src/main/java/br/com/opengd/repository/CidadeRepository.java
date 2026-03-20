package br.com.opengd.repository;

import br.com.opengd.entity.Cidade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

public interface CidadeRepository extends JpaRepository<Cidade, Long> {
    @Query("SELECT p FROM Cidade p WHERE LOWER(p.nome) = LOWER(:nome) ORDER BY p.nome ")
    List<Cidade> findByNome(@Param("nome") String nome);

    @Query("SELECT p FROM Cidade p WHERE p.idIbge = :idIbge")
    Cidade findFirstByIdIbge(@Param("idIbge") String idIbge);

    @Query("SELECT c FROM Cidade c " +
            "WHERE (:#{#params['nome']} IS NULL OR LOWER(c.nome) LIKE LOWER(CONCAT('%', :#{#params['nome']}, '%'))) " +
            "AND (:#{#params['uf']} IS NULL OR LOWER(c.uf) = LOWER(:#{#params['uf']})) " +
            " ORDER BY c.nome"
    )
    List<Cidade> findByDynamicQuery(@Param("params") Map<String, String> params);

}
