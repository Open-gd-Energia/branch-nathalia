package br.com.opengd.repository;

import br.com.opengd.entity.Permissao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PermissaoRepository extends JpaRepository<Permissao, Long> {
    @Query("SELECT p FROM Permissao p WHERE LOWER(p.nome) = LOWER(:name) ORDER BY p.nome")
    List<Permissao> findByNome(String name);
}
