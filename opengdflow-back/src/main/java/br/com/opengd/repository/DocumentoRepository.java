package br.com.opengd.repository;

import br.com.opengd.entity.Documento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

public interface DocumentoRepository extends JpaRepository<Documento, Long> {
    @Query("SELECT d FROM Documento d " +
            "LEFT JOIN d.usina u " +
            "LEFT JOIN d.consumidor c " +
            "LEFT JOIN d.representante r " +
            "LEFT JOIN d.usuario a " +
            "WHERE (:#{#params['idUsina']} IS NULL OR u.id = :#{#params['idUsina']}) " +
            "AND (:#{#params['idConsumidor']} IS NULL OR c.id = :#{#params['idConsumidor']}) " +
            "AND (:#{#params['idRepresentante']} IS NULL OR r.id = :#{#params['idRepresentante']}) " +
            "AND (:#{#params['idUsuario']} IS NULL OR a.id = :#{#params['idUsuario']}) " +
            "AND (:#{#params['dataInicial']} IS NULL OR d.dataHora >= FUNCTION('TO_TIMESTAMP', :#{#params['dataInicial']}, 'YYYY-MM-DD\"T\"HH24:MI:SS')) " +
            "AND (:#{#params['dataFinal']} IS NULL OR d.dataHora <= FUNCTION('TO_TIMESTAMP', :#{#params['dataFinal']}, 'YYYY-MM-DD\"T\"HH24:MI:SS'))" +
            "AND (:#{#params['tipo']} IS NULL OR d.tipo = :#{#params['tipo']}) " +
            "AND (:#{#params['descricao']} IS NULL OR LOWER(d.descricao) LIKE LOWER(CONCAT('%', :#{#params['descricao']}, '%'))) " +
            "AND (:#{#params['nome']} IS NULL OR LOWER(d.nome) LIKE LOWER(CONCAT('%', :#{#params['nome']}, '%'))) " +
            " ORDER BY d.nome "
    )
    List<Documento> findByDynamicQuery(@Param("params") Map<String, String> params);
}
