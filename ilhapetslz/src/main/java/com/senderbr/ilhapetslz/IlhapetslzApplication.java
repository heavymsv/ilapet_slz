package com.senderbr.ilhapetslz;

import com.senderbr.ilhapetslz.services.StorageProperties;
import com.senderbr.ilhapetslz.services.StorageService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
@ComponentScan
@EnableConfigurationProperties(StorageProperties.class)
public class IlhapetslzApplication extends SpringBootServletInitializer{

	public static void main(String[] args) {
		SpringApplication.run(IlhapetslzApplication.class, args);}

		@Bean
		CommandLineRunner init(StorageService storageService) {
			return (args) -> {
				storageService.deleteAll();
				storageService.init();
			};
		}

		@Override
		protected SpringApplicationBuilder configure(SpringApplicationBuilder application){

			return application.sources(IlhapetslzApplication.class);

		}

}
