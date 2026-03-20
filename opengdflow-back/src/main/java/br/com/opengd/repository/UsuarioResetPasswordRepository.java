package br.com.opengd.repository;

import br.com.opengd.entity.UsuarioResetPassword;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UsuarioResetPasswordRepository extends JpaRepository<UsuarioResetPassword, Long> {
    @Query(" SELECT p FROM UsuarioResetPassword p " +
            " WHERE p.token = :token " +
            " AND p.dataHoraExpiracao > CURRENT_TIMESTAMP" +
            " ORDER BY p.dataHoraExpiracao DESC")
    List<UsuarioResetPassword> findByEmailAndToken(@Param("token") String token);

    @Query(" SELECT p FROM UsuarioResetPassword p " +
            " WHERE p.usuario.id = :idUsario ")
    List<UsuarioResetPassword> findByUsuario(@Param("idUsario") String idUsario);
//
//    @Query("SELECT u FROM Usuario u " +
//            "WHERE (:#{#params['nome']} IS NULL OR LOWER(u.nome) LIKE LOWER(CONCAT('%', :#{#params['nome']}, '%'))) " +
//            " AND (:#{#params['email']} IS NULL OR LOWER(u.email) LIKE LOWER(CONCAT('%', :#{#params['email']}, '%'))) " +
//            " AND (:#{#params['celular']} IS NULL OR LOWER(u.celular) LIKE LOWER(CONCAT('%', :#{#params['celular']}, '%'))) " +
//            " AND (:#{#params['status']} IS NULL OR u.status = :#{#params['status']}) " +
//            " ORDER BY u.nome asc"
//    )
//    List<Usuario> findByAttributes(@Param("params") Map<String, String> params);
//
//    @Query("SELECT u FROM Usuario u JOIN u.usinas uu WHERE uu.usina.id = :usinaId")
//    List<Usuario> findByUsinaId(@Param("usinaId") Long usinaId);
}
