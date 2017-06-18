package com.angel.controll;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.angel.common.ResponeMsg;
import com.angel.dto.OrderDto;
import com.angel.service.OrderService;

@Controller
public class OrderController {
	private static final Logger logger = LoggerFactory.getLogger(OrderController.class);
	

	@Resource
	private OrderService orderService;
	
	
	@RequestMapping("/createOrder")
	@ResponseBody
	public ResponeMsg createOrder(@RequestBody OrderDto order) {
		ResponeMsg msg=new ResponeMsg();
		try{
			System.out.println(JSON.toJSONString(order));
		Long orderId=this.orderService.createOrder(order);
		msg.setStatus(ResponeMsg.sus);
		msg.getData().put("id", orderId);
		}catch(Exception e){
			msg.setStatus(ResponeMsg.fail);
			msg.setErrMsg(e.getMessage());
			logger.error(e.getMessage(),e);
		}
		
		return msg;
	}
}
