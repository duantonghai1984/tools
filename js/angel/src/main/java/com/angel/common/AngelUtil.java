package com.angel.common;

import javax.servlet.http.HttpSession;

import com.angel.interceptor.MvcConfig;
import com.angel.mo.Shop;

public class AngelUtil {

	public static Shop getShopSession(HttpSession httpSession){
		return (Shop) httpSession.getAttribute(MvcConfig.SESSION_KEY);
	}
}
