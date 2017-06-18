package com.angel.controll;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.angel.dto.ShopDto;
import com.angel.service.ShopService;

@Controller
public class ShopController {
	private static final Logger logger = LoggerFactory.getLogger(ShopController.class);
	

	@Resource
	private ShopService shopService;
	
	
	@RequestMapping("/shopDet")
	@ResponseBody
	public ShopDto shopDet(Long id) {
		return this.shopService.getShop(id);
	}
}
