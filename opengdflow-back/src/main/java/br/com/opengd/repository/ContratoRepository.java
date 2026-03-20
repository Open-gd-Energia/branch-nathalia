package br.com.opengd.repository;

import br.com.opengd.entity.Contrato;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

public interface ContratoRepository extends JpaRepository<Contrato, Long> {
    @Query("SELECT c FROM Contrato c " +
            "WHERE (:#{#params['idUsina']} IS NULL OR c.usina.id = :#{#params['idUsina']}) " +
            "AND (:#{#params['dataInicial']} IS NULL OR c.dataHora >= FUNCTION('TO_TIMESTAMP', :#{#params['dataInicial']}, 'YYYY-MM-DD\"T\"HH24:MI:SS')) " +
            "AND (:#{#params['dataFinal']} IS NULL OR c.dataHora <= FUNCTION('TO_TIMESTAMP', :#{#params['dataFinal']}, 'YYYY-MM-DD\"T\"HH24:MI:SS'))" +
            "AND (:#{#params['descricao']} IS NULL OR LOWER(c.descricao) LIKE LOWER(CONCAT('%', :#{#params['descricao']}, '%'))) " +
            " ORDER BY c.dataHora desc "
    )
    List<Contrato> findByDynamicQuery(@Param("params") Map<String, String> params);
}
