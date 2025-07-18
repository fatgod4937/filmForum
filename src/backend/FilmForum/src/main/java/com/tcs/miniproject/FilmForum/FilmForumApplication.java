package com.tcs.miniproject.FilmForum;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Collections;

@SpringBootApplication
public class FilmForumApplication {

	public static void main(String[] args) {
		SpringApplication.run(FilmForumApplication.class, args);
	}

	@Bean
	public CorsFilter corsFilter() {
		final var corsAll = Collections.singletonList(CorsConfiguration.ALL);
		final var cors = new CorsConfiguration();
		cors.setAllowedOrigins(corsAll);
		cors.setAllowedMethods(corsAll);
		cors.setAllowedHeaders(corsAll);

		final var source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", cors);


		return new CorsFilter(source);
	}

	@Bean
	public SecurityFilterChain defaultSecurityFilterChain(
			final HttpSecurity http
	)throws Exception{
		return http
				.csrf(AbstractHttpConfigurer::disable)
				.cors(cors -> corsFilter())
				.build();

	}

}
