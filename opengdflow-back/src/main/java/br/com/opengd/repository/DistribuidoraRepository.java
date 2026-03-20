package br.com.opengd.repository;

import br.com.opengd.entity.Distribuidora;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

public interface DistribuidoraRepository extends JpaRepository<Distribuidora, Long> {

    @Query("SELECT p FROM Distribuidora p WHERE LOWER(p.nome) = LOWER(:nome) ORDER BY p.nome ")
    List<Distribuidora> findByNome(@Param("nome") String name);

    @Query("SELECT p FROM Distribuidora p WHERE LOWER(p.sigla) = LOWER(:sigla) ORDER BY p.sigla ")
    List<Distribuidora> findBySigla(@Param("sigla") String sigla);

    @Query("SELECT p FROM Distribuidora p WHERE p.cnpj = :cnpj ORDER BY p.nome ")
    List<Distribuidora> findByCnpj(@Param("cnpj") String cnpj);

    @Query("SELECT c FROM Distribuidora c " +
            "WHERE (:#{#params['sigla']} IS NULL OR c.sigla = :#{#params['sigla']}) " +
            "AND (:#{#params['nome']} IS NULL OR LOWER(c.nome) LIKE LOWER(CONCAT('%', :#{#params['nome']}, '%'))) " +
            " ORDER BY c.nome "
    )
    List<Distribuidora> findByDynamicQuery(@Param("params") Map<String, String> params);
}
