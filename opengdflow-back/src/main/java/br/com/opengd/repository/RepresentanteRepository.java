package br.com.opengd.repository;

import br.com.opengd.entity.Representante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

public interface RepresentanteRepository extends JpaRepository<Representante, Long> {
    @Query("SELECT r FROM Representante r WHERE r.pessoaFisica.cpf = :cpf")
    List<Representante> findByPessoaFisicaCpf(@Param("cpf") String cpf);

    @Query("SELECT r FROM Representante r WHERE r.pessoaJuridica.cnpj = :cnpj")
    List<Representante> findByPessoaJuridicaCnpj(@Param("cnpj") String cnpj);

    @Query("SELECT r FROM Representante r " +
            "LEFT JOIN r.pessoaFisica pf " +
            "LEFT JOIN r.pessoaJuridica pj " +
            "WHERE (:#{#params['cpf']} IS NULL OR pf.cpf = :#{#params['cpf']}) " +
            "AND (:#{#params['cnpj']} IS NULL OR pj.cnpj = :#{#params['cnpj']}) " +
            "AND (:#{#params['status']} IS NULL OR r.status = :#{#params['status']}) " +
            "AND (" +
            " (:#{#params['nomeFisica']} IS NULL OR LOWER(pf.nome) LIKE LOWER(CONCAT('%', :#{#params['nomeFisica']}, '%'))) " +
            " OR (:#{#params['razaoSocial']} IS NULL OR LOWER(pj.razaoSocial) LIKE LOWER(CONCAT('%', :#{#params['razaoSocial']}, '%'))) " +
            " OR (:#{#params['nomeFantasia']} IS NULL OR LOWER(pj.nomeFantasia) LIKE LOWER(CONCAT('%', :#{#params['nomeFantasia']}, '%')))" +
            ") " +
            " ORDER BY pf.nome, pj.razaoSocial, pj.nomeFantasia "
    )
    List<Representante> findByDynamicQuery(@Param("params") Map<String, String> params);
}
