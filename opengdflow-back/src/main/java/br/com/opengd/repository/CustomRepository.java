package br.com.opengd.repository;

import java.util.List;
import java.util.Map;

public interface CustomRepository {
    <T> List<T> executeQuery(String sql, Class<T> resultClass);

    <T> List<T> executeQuery(String sql, Map<String, Object> params, Class<T> resultClass);
}