package com.angel.controll;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import com.angel.common.ResponeMsg;
import com.angel.common.mybatis.Pagination;
import com.angel.dto.CatogryDto;
import com.angel.dto.OrderDto;
import com.angel.mo.Shop;
import com.angel.service.OrderService;

@Controller
@RequestMapping("/order")
public class OrderAction {
	private static final Logger logger = LoggerFactory.getLogger(OrderAction.class);
	

	@Resource
	private OrderService orderService;
	
	@RequestMapping("/orderList")
	@ResponseBody
	public Pagination<OrderDto> orderList(@RequestBody OrderDto query,@SessionAttribute Shop shop) {
		Pagination<OrderDto> pg=new Pagination<OrderDto>();
		if(shop.getId()==null){
			logger.error("没有参数");
			return pg;
		}
		query.setShopid(shop.getId());
		return this.orderService.findOrderPg(query);
	}
	
	
	
	
	@RequestMapping(value = "/payOrder")
	@ResponseBody
	public ResponeMsg payOrder(@RequestBody CatogryDto query) throws Exception {
		ResponeMsg msg = new ResponeMsg();
		return msg;
	}
	
	@RequestMapping(value = "/delOrder")
	@ResponseBody
	public ResponeMsg delOrder(@RequestBody OrderDto query) throws Exception {
		ResponeMsg msg = new ResponeMsg();
		return msg;
	}
	

	
}
