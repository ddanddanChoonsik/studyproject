package com.example.demo;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.PropertySource;


@SpringBootApplication
//@PropertySource("classpath:/security_submodules/application.yml")
@ComponentScan({"com.example.demo","data.*"})
@MapperScan({"data.mapper"})
public class Study1Application {

	public static void main(String[] args) {
		SpringApplication.run(Study1Application.class, args);
	}

}
