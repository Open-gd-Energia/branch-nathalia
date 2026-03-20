package br.com.opengd.repository;

import br.com.opengd.entity.FattureWebProcessamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface FattureWebProcessamentoRepository extends JpaRepository<FattureWebProcessamento, Long> {
    @Query("SELECT f FROM FattureWebProcessamento f " +
            " WHERE LOWER(f.path) = LOWER(:path) " +
            " AND LOWER(f.method) = LOWER(:method) " +
            " ORDER BY f.dataProcessamento DESC LIMIT 1 ")
    Optional<FattureWebProcessamento> findLastByDataProcessamento(@Param("path") String path, @Param("method") String method);
}
