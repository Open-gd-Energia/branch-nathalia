package br.com.opengd.repository;

import br.com.opengd.entity.Perfil;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PerfilRepository extends JpaRepository<Perfil, Long> {
    @Query("SELECT p FROM Perfil p WHERE LOWER(p.nome) = LOWER(:name) ORDER BY p.nome ")
    List<Perfil> findByNome(@Param("name") String name);
}
