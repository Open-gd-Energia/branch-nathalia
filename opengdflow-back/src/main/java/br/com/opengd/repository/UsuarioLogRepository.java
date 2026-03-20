package br.com.opengd.repository;

import br.com.opengd.entity.UsuarioLog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Map;

public interface UsuarioLogRepository extends JpaRepository<UsuarioLog, Long> {
    @Query("SELECT c FROM UsuarioLog c " +
            "WHERE (:#{#params['idUsuario']} IS NULL OR c.usuario.id = :#{#params['idUsuario']}) " +
            "AND (:#{#params['evento']} IS NULL OR LOWER(c.evento) LIKE LOWER(CONCAT('%', :#{#params['evento']}, '%'))) " +
            "AND (:#{#params['mensagem']} IS NULL OR LOWER(c.mensagem) LIKE LOWER(CONCAT('%', :#{#params['mensagem']}, '%'))) " +
            "AND (:#{#params['origem']} IS NULL OR LOWER(c.origem) LIKE LOWER(CONCAT('%', :#{#params['origem']}, '%'))) " +
            "AND (:#{#params['dataInicial']} IS NULL OR c.dataHora >= FUNCTION('TO_TIMESTAMP', :#{#params['dataInicial']}, 'YYYY-MM-DD\"T\"HH24:MI:SS')) " +
            "AND (:#{#params['dataFinal']} IS NULL OR c.dataHora <= FUNCTION('TO_TIMESTAMP', :#{#params['dataFinal']}, 'YYYY-MM-DD\"T\"HH24:MI:SS')) " +
            " ORDER BY c.id "
    )
    Page<UsuarioLog> findByDynamicQuery(@Param("params") Map<String, String> params, Pageable pageable);
}
