package br.com.opengd.repository;

import br.com.opengd.entity.TipoDesconto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

public interface TipoDescontoRepository extends JpaRepository<TipoDesconto, Long> {
    @Query("SELECT p FROM TipoDesconto p WHERE LOWER(p.nome) = LOWER(:nome) ORDER BY p.nome ")
    List<TipoDesconto> findByNome(@Param("nome") String nome);

    @Query("SELECT c FROM TipoDesconto c " +
            "WHERE (:#{#params['nome']} IS NULL OR LOWER(c.nome) LIKE LOWER(CONCAT('%', :#{#params['nome']}, '%'))) " +
            "AND (:#{#params['descricao']} IS NULL OR LOWER(c.descricao) LIKE LOWER(CONCAT('%', :#{#params['descricao']}, '%'))) " +
            " ORDER BY c.nome "
    )
    List<TipoDesconto> findByDynamicQuery(@Param("params") Map<String, String> params);
}
