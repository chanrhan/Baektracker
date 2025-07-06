package com.hanco.hanco.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
				.allowedOrigins("http://localhost:20000","http://localhost:8080","http://localhost:3000") // 안에 해당 주소를 넣어도 됨
//				.allowedOriginPatterns("*")
				.allowedMethods("GET", "POST")
				.allowedHeaders("*")
				.allowCredentials(true)
				.maxAge(3000);
		//.allowCredentials(true); // .allowedOriginPatterns("*") 이렇게 와일드 카드로 설정하면 이거 쓰면 에러남 ( 실행 조차  X )
	}

//	@Override
//	public void addViewControllers(ViewControllerRegistry registry) {
//		registry.addViewController("/{spring:\\w+}")
//				.setViewName("forward:/");
//		registry.addViewController("/**/{spring:\\w+}")
//				.setViewName("forward:/");
//		// /api/로 시작하지 않는 url은 모두 client 화면으로 보내줄 것이다
//		registry.addViewController("/{x:^(?!api$).*$}/**/{y:[\\w\\-]+}")
//				.setViewName("forward:/");
//	}

}
