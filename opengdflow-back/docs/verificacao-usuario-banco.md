# Conferência de usuário no banco (login)

O login falha com **401** quando o backend rejeita as credenciais. Para conferir o usuário no banco, use as consultas abaixo.

## Tabela e campos relevantes

- **Tabela:** `USUARIO`
- **Status:** `0` = Inativo (login bloqueado), `1` = Ativo
- **Senha:** armazenada com **BCrypt**. O hash começa com `$2a$` ou `$2b$` e tem ~60 caracteres.

## Consultas úteis

### Listar usuários por email e status

```sql
SELECT id, nome, email, status,
       LEFT(senha, 20) || '...' AS senha_inicio
FROM USUARIO
WHERE LOWER(email) = LOWER('seu_email@exemplo.com');
```

### Verificar se o usuário está ativo

```sql
SELECT id, email, status,
       CASE WHEN status = 1 THEN 'Ativo' ELSE 'Inativo' END AS status_descricao
FROM USUARIO
WHERE LOWER(email) = LOWER('seu_email@exemplo.com');
```

### Verificar formato da senha (BCrypt)

A senha deve ser um hash BCrypt válido (ex.: `$2a$10$...`). Se estiver em texto puro, o login nunca vai bater.

```sql
SELECT id, email,
       CASE
         WHEN senha IS NULL THEN 'NULL'
         WHEN senha LIKE '$2a$%' OR senha LIKE '$2b$%' THEN 'BCrypt (OK)'
         ELSE 'Provavelmente texto puro (ERRADO)'
       END AS formato_senha
FROM USUARIO
WHERE LOWER(email) = LOWER('seu_email@exemplo.com');
```

### Ativar usuário (status = 1)

```sql
UPDATE USUARIO
SET status = 1
WHERE LOWER(email) = LOWER('seu_email@exemplo.com');
```

### Redefinir senha para um valor conhecido (apenas desenvolvimento)

No Java (ou via endpoint de reset de senha), use sempre `BCryptPasswordEncoder` para gerar o hash. Exemplo em código:

```java
// Senha "123456" -> hash BCrypt
String hash = passwordEncoder.encode("123456");
// Persistir hash no campo USUARIO.senha
```

Para testar no banco, gere o hash pela API de reset de senha ou por um pequeno script/endpoint de dev que use `BCryptPasswordEncoder`.

## Resumo das causas de 401 no AuthController

1. **Usuário não existe** (`user.isEmpty()`)
2. **Senha não confere** (`!user.get().isLoginCorrect(...)`) — senha em texto puro ou hash incorreto no banco
3. **Usuário inativo** (`user.get().getStatus().equals(0L)`)

Confira sempre: usuário existe, `status = 1` e `senha` em formato BCrypt.
