package db.com.rentalvehicle.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI rentalVehicleOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Rental Vehicle API")
                        .description("API for managing rental vehicle operations")
                        .version("1.0")
                        .contact(new Contact()
                                .name("Rental Vehicle Team")
                                .email("support@rentalvehicle.com"))
                        .license(new License()
                                .name("Apache 2.0")
                                .url("http://www.apache.org/licenses/LICENSE-2.0.html")));
    }
} 