package com.angel.controll;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.angel.common.ResponeMsg;
import com.angel.dto.ShopDto;
import com.angel.interceptor.MvcConfig;
import com.angel.mo.Shop;
import com.angel.service.ShopService;

@Controller
@RequestMapping("/shop")
public class ShopAction {
	private static final Logger logger = LoggerFactory.getLogger(ShopAction.class);

	@Resource
	private ShopService shopService;


	@RequestMapping("/login")
	@ResponseBody
	public ResponeMsg login(@RequestBody ShopDto dto,HttpSession httpSession) {

		ResponeMsg msg = new ResponeMsg();
		
		List<ShopDto> list = this.shopService.findShopList(dto);
		if (CollectionUtils.isEmpty(list)) {
			msg.setStatus(ResponeMsg.fail);
			msg.setErrMsg("用户名密码错误");
		} else {
			msg.getData().put("user", list.get(0));
			msg.setStatus(ResponeMsg.sus);
			
			httpSession.setAttribute(MvcConfig.SESSION_KEY, list.get(0));
		}
		return msg;
	}
	
	@RequestMapping("/logout")
	@ResponseBody
	public ResponeMsg logout(HttpSession httpSession) {
		ResponeMsg msg = new ResponeMsg();
		httpSession.removeAttribute(MvcConfig.SESSION_KEY);
		msg.setStatus(ResponeMsg.sus);
		return msg;
	}

	@RequestMapping("/register")
	@ResponseBody
	public ResponeMsg register(@RequestBody Shop shop) {
		ResponeMsg msg = new ResponeMsg();
		try {
			Long id = this.shopService.createShop(shop);
			msg.setStatus(ResponeMsg.sus);
			msg.getData().put("id", id);
		} catch (Exception e) {
			msg.setStatus(ResponeMsg.fail);
			msg.setErrMsg(e.getMessage());
			logger.error(e.getMessage(), e);
		}
		return msg;
	}
	
	
	@RequestMapping("/update")
	@ResponseBody
	public ResponeMsg update(Shop shop) {
		ResponeMsg msg = new ResponeMsg();
		try {
			int count = this.shopService.updateShop(shop);
			msg.setStatus(ResponeMsg.sus);
			msg.getData().put("id", count);
		} catch (Exception e) {
			msg.setStatus(ResponeMsg.fail);
			msg.setErrMsg(e.getMessage());
			logger.error(e.getMessage(), e);
		}
		return msg;
	}
	
	
	

}
