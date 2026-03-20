# OpenGD

Abaixo podemos encontrar formas de executar o projeto em banco de dados H2

# Copie os arquivos do projeto
opengd-0.0.1-SNAPSHOT.jar (projeto compilado)

application-h2.properties (arquivo de properties)

app.key (arquivo de chave privada)

app.pub (arquivo de chave publica)

# Requisitos

Java 23 instalado

Abrir o terminar e conferir se esta instalado o java
> java --version

# Executando projeto
No terminal executar o comando abaixo
> java -jar opengd-0.0.1-SNAPSHOT.jar --spring.profiles.active=h2

# Request para login no sistema
>curl --request POST \
--url http://localhost:8080/login \
--header 'Content-Type: application/json' \
--header 'User-Agent: insomnia/10.0.0' \
--data '{
"email": "admin",
"senha": "123"
}'

# Swagger poderá ser acessado por 
http://localhost:8080/swagger-ui.html

http://localhost:8080/v3/api-docs

