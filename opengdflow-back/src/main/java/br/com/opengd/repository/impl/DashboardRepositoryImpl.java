package br.com.opengd.repository.impl;

import br.com.opengd.repository.CustomRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class DashboardRepositoryImpl implements CustomRepository {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public <T> List<T> executeQuery(String sql, Class<T> resultClass) {
        Query query = entityManager.createNativeQuery(sql, resultClass);
        return query.getResultList();
    }

    @Override
    public <T> List<T> executeQuery(String sql, Map<String, Object> params, Class<T> resultClass) {
        Query query = entityManager.createNativeQuery(sql, resultClass);
        if (params != null) {
            params.forEach(query::setParameter);
        }
        return query.getResultList();
    }
}