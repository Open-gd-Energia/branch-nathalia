# Estágio 1: Build (Usando JDK 21)
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Estágio 2: Run (Usando JRE 21 leve)
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app
# O nome do arquivo gerado pelo seu pom será opengd-0.0.1-SNAPSHOT.jar
COPY --from=build /app/target/opengd-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]