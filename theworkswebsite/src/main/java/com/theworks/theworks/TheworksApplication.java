package com.theworks.theworks;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.web.servlet.error.ErrorMvcAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EntityScan("com.theworks.entities")
@ComponentScan("com.theworks.controllers")
@SpringBootApplication(exclude = ErrorMvcAutoConfiguration.class)
@EnableJpaRepositories("com.theworks.repos")
public class TheworksApplication {

	public static void main(String[] args) {
		SpringApplication.run(TheworksApplication.class, args);
	}

}