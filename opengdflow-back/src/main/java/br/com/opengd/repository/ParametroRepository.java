package br.com.opengd.repository;

import br.com.opengd.entity.Parametro;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ParametroRepository extends JpaRepository<Parametro, String> {
//    @Query("SELECT p FROM Parametro p WHERE LOWER(p.chave) = LOWER(:chave) ORDER BY p.chave ")
//    List<Parametro> findByChave(@Param("chave") String chave);
}
