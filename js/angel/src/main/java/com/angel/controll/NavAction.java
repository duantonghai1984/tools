package com.angel.controll;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class NavAction {
	
	@RequestMapping("/mhome")
	public String mhome(String shopId,String deskId) {
		return "redirect:mo/index.html#/home?shopId="+shopId+"&deskId="+deskId;
	}
	
	@RequestMapping("/")
	public String home() {
		return "redirect:/pc/index.html/#/login";
	}

}
