package br.com.opengd.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("APIs Backend OpenGD")
                        .version("1.0.0")
                        .description("Documentação da APIs do Backend OpenGD")
                        .contact(new Contact()
                                .name("Aires Galina Junior")
                                .email("airesgjr@yahoo.com.br")
                        )
                );
    }
}