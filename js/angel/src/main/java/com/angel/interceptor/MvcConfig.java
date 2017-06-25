package com.angel.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

@Configuration
public class MvcConfig extends WebMvcConfigurerAdapter {

	public final static String SESSION_KEY = "shop";

	@Bean
	public SecurityInterceptor getSecurityInterceptor() {
		return new SecurityInterceptor();
	}

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		
		InterceptorRegistration addInterceptor = registry.addInterceptor(getSecurityInterceptor());
		// 排除配置
		addInterceptor.excludePathPatterns("/error");
		addInterceptor.excludePathPatterns("/shop/login**");
		addInterceptor.excludePathPatterns("/shop/logout**");
		addInterceptor.excludePathPatterns("/food/uploadPic**");
		addInterceptor.excludePathPatterns("/food/disImage**");
		addInterceptor.excludePathPatterns("/food/delImage**");
		addInterceptor.excludePathPatterns("/mo/**");

		// 拦截配置
		addInterceptor.addPathPatterns("/**");
		
	}

	private class SecurityInterceptor extends HandlerInterceptorAdapter {

		@Override
		public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
				throws Exception {
			HttpSession session = request.getSession();
			if (session.getAttribute(SESSION_KEY) != null)
				return true;
			// 跳转登录
			String url = "/shop/login";
			response.sendRedirect(url);
			System.out.println("preHandle");
			return false;
		}
	}

}
