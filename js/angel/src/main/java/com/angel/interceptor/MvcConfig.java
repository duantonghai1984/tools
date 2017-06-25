package com.angel.interceptor;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.web.servlet.config.annotation.InterceptorRegistration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.alibaba.fastjson.serializer.SerializerFeature;
import com.alibaba.fastjson.support.config.FastJsonConfig;
import com.alibaba.fastjson.support.spring.FastJsonHttpMessageConverter;

@Configuration
public class MvcConfig extends WebMvcConfigurerAdapter {

	public final static String SESSION_KEY = "shop";
	
	
	 @Override
	    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
	        FastJsonHttpMessageConverter fastConverter = new FastJsonHttpMessageConverter();
	        FastJsonConfig fastJsonConfig = new FastJsonConfig();
	        fastJsonConfig.setSerializerFeatures(SerializerFeature.PrettyFormat);
	        //处理中文乱码问题
	        List<MediaType> fastMediaTypes = new ArrayList<>();
	        fastMediaTypes.add(MediaType.APPLICATION_JSON_UTF8);
	        fastConverter.setSupportedMediaTypes(fastMediaTypes);
	        fastConverter.setFastJsonConfig(fastJsonConfig);
	        converters.add(fastConverter);
	    }

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
		addInterceptor.excludePathPatterns("/mhome**");
		addInterceptor.excludePathPatterns("/home**");

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
			String url = "pc/index.html/#/login";
			response.sendRedirect(url);
			System.out.println("preHandle");
			return false;
		}
	}

}
