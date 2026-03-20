package br.com.opengd.config;

import org.hibernate.dialect.PostgreSQLDialect;

import java.sql.Types;

public class CustomPostgreSQLDialect extends PostgreSQLDialect {

    @Override
    protected String columnType(int sqlTypeCode) {
        if (sqlTypeCode == Types.DECIMAL || sqlTypeCode == Types.NUMERIC) {
            return "numeric(15,8)";
        }
        return super.columnType(sqlTypeCode);
    }
}
