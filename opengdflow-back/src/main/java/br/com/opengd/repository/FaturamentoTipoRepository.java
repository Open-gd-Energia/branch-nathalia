package br.com.opengd.repository;

import br.com.opengd.entity.FaturamentoTipo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

public interface FaturamentoTipoRepository extends JpaRepository<FaturamentoTipo, Long> {

    @Query("SELECT p FROM FaturamentoTipo p WHERE LOWER(p.nome) = LOWER(:nome) ORDER BY p.nome ")
    List<FaturamentoTipo> findByNome(@Param("nome") String nome);

    @Query("SELECT c FROM FaturamentoTipo c " +
            "WHERE (:#{#params['nome']} IS NULL OR LOWER(c.nome) LIKE LOWER(CONCAT('%', :#{#params['nome']}, '%'))) " +
            "AND (:#{#params['descricao']} IS NULL OR LOWER(c.descricao) LIKE LOWER(CONCAT('%', :#{#params['descricao']}, '%'))) " +
            "AND (:#{#params['referencia']} IS NULL OR c.referencia = :#{#params['referencia']}) " +
            " ORDER BY c.nome "
    )
    List<FaturamentoTipo> findByDynamicQuery(@Param("params") Map<String, String> params);
}
