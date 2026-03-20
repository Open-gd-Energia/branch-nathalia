package br.com.opengd.config;

import org.hibernate.dialect.H2Dialect;

/**
 * Dialect H2 que desativa INSERT ... RETURNING (não suportado pelo H2 da forma que o Hibernate gera).
 * Evita: Syntax error in SQL statement "... returning id" [42000-224]
 */
public class CustomH2Dialect extends H2Dialect {

    @Override
    public boolean supportsInsertReturning() {
        return false;
    }
}
