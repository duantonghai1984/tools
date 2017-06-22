package com.angel;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.scheduling.annotation.EnableAsync;

/**
 * 修改启动类，继承 SpringBootServletInitializer 并重写 configure 方法
 */
@EnableAsync
@SpringBootApplication
public class AngelApplication  extends SpringBootServletInitializer{

	public static void main(String[] args) {
		SpringApplication.run(AngelApplication.class, args);
	}
	
	protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(this.getClass());
    }
}
