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
@RequestMapping("/order")
public class OrderAction {
	private static final Logger logger = LoggerFactory.getLogger(OrderAction.class);
	

	@Resource
	private OrderService orderService;
	
	
}
