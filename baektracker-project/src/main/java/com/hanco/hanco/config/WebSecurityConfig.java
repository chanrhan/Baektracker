package com.hanco.hanco.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.header.writers.frameoptions.XFrameOptionsHeaderWriter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
public class WebSecurityConfig {
//	private final AuthenticationConfiguration authenticationConfiguration;

	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
//		http.authorizeRequests((authorizeHttpRequests)->authorizeHttpRequests
//				.requestMatchers("/api/v1/admin")
//				.hasRole("ADMIN")
//				// 웹소켓, SSE 모두 이거 url 허용 안해주면 에러가 발생한다
//				// Stomp는 아예 에러 메시지 조차 뜨지 않아서 힘들었다..
//				.requestMatchers("/api/v1/public/**","/api/v1/auth/**","/api/v1/test/**",
////						"/api/v1/gmd/**",
//						"/study/**",
//						"/sse/**","/ws/**","/**")
//				.permitAll()
//				.requestMatchers("/api/v1/**")
//				.authenticated());
//		http.formLogin(formLogin->formLogin.);
		// csrf는 토큰을 발행하여 세션으로 등록하는데
		// h2-console은 이러한 기능들이 없기 떄문에 403 오류가 발생하게 된다.
		// 따라서 예외로 처리될 수 있도록 한다. (h2-console 은 csrf 무시)
//				.csrf((csrf)->csrf.ignoringRequestMatchers(new AntPathRequestMatcher("/h2-console/**")))

//		http.headers((headers)->headers.
//				addHeaderWriter(new XFrameOptionsHeaderWriter(XFrameOptionsHeaderWriter.XFrameOptionsMode.SAMEORIGIN)));
		// 로그인 URL 설정
//				.formLogin((formLogin)->formLogin
////								   .loginPage("/index.html")
//						.loginProcessingUrl("/account/login")
//								   .successHandler(new LoginSuccessHandler(userService))
//								   .failureHandler(new LoginFailureHandler())

		// 나중에 XssEscapeFilter 도 추가하여 xss 공격 방지해야됨

		http.csrf(AbstractHttpConfigurer::disable);

		return http.build();
	}

	// AuthenticationManager는 Spring Security의 인증을 담당
	// 사용자 인증 시 앞에서 작성한 UserSecurityService의 PasswordEncoder를 사용한다
//	@Bean
//	AuthenticationManager authenticationManager() throws Exception{
//		return authenticationConfiguration.getAuthenticationManager();
//	}



}
