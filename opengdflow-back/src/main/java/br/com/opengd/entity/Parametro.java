package br.com.opengd.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Table(name = "PARAMETRO")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Parametro {

    @Id
    private String chave;

    @Column(name = "valor", columnDefinition = "VARCHAR(255)")
    private String valor;
}