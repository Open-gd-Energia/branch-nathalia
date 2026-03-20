package br.com.opengd.repository;

import br.com.opengd.entity.Irradiacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

public interface IrradiacaoRepository extends JpaRepository<Irradiacao, Long> {
    @Query("SELECT i FROM Irradiacao i " +
            "WHERE (:#{#params['idUsina']} IS NULL OR i.usina.id = :#{#params['idUsina']}) " +
            "AND (:#{#params['ano']} IS NULL OR YEAR(i.data) = :#{#params['ano']}) " +
            "AND (:#{#params['mes']} IS NULL OR MONTH(i.data) = :#{#params['mes']}) " +
            "AND (:#{#params['dia']} IS NULL OR DAY(i.data) = :#{#params['dia']}) " +
            " ORDER BY i.id desc "
    )
    List<Irradiacao> findByDynamicQuery(@Param("params") Map<String, String> params);
}
