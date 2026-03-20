package br.com.opengd.repository;

import br.com.opengd.entity.Banco;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

public interface BancoRepository extends JpaRepository<Banco, Long> {
    @Query("SELECT p FROM Banco p WHERE LOWER(p.nome) = LOWER(:nome) ORDER BY p.nome ")
    List<Banco> findByNome(@Param("nome") String nome);

    @Query("SELECT c FROM Banco c " +
            "WHERE (:#{#params['nome']} IS NULL OR LOWER(c.nome) LIKE LOWER(CONCAT('%', :#{#params['nome']}, '%'))) " +
            " ORDER BY c.nome"
    )
    List<Banco> findByDynamicQuery(@Param("params") Map<String, String> params);
}
