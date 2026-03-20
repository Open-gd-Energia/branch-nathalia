package br.com.opengd.repository;

import br.com.opengd.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    @Query("SELECT p FROM Usuario p WHERE LOWER(p.email) = LOWER(:email)")
    Optional<Usuario> findByEmail(String email);

    @Modifying
    @Query("UPDATE Usuario u SET u.senha = :senha, u.status = :status WHERE LOWER(u.email) = LOWER(:email)")
    int updateSenhaAndStatusByEmail(@Param("email") String email, @Param("senha") String senha, @Param("status") Long status);

    @Query("SELECT u FROM Usuario u " +
            "WHERE (:#{#params['nome']} IS NULL OR LOWER(u.nome) LIKE LOWER(CONCAT('%', :#{#params['nome']}, '%'))) " +
            " AND (:#{#params['email']} IS NULL OR LOWER(u.email) LIKE LOWER(CONCAT('%', :#{#params['email']}, '%'))) " +
            " AND (:#{#params['celular']} IS NULL OR LOWER(u.celular) LIKE LOWER(CONCAT('%', :#{#params['celular']}, '%'))) " +
            " AND (:#{#params['status']} IS NULL OR u.status = :#{#params['status']}) " +
            " ORDER BY u.nome asc"
    )
    List<Usuario> findByAttributes(@Param("params") Map<String, String> params);

    @Query("SELECT u FROM Usuario u JOIN u.usinas uu WHERE uu.usina.id = :usinaId")
    List<Usuario> findByUsinaId(@Param("usinaId") Long usinaId);
}
