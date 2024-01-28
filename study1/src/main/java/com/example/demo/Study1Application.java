package com.example.demo;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;


@SpringBootApplication
@ComponentScan({"com.example.demo","data.*"})
@MapperScan({"data.*"})
public class Study1Application {

	public static void main(String[] args) {
		SpringApplication.run(Study1Application.class, args);
	}

}
