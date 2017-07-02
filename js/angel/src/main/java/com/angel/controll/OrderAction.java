package com.angel.controll;

import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import com.alibaba.fastjson.JSON;
import com.angel.common.ResponeMsg;
import com.angel.common.mybatis.Pagination;
import com.angel.dto.OrderDetDto;
import com.angel.dto.OrderDto;
import com.angel.mo.Order;
import com.angel.mo.OrderDet;
import com.angel.mo.Shop;
import com.angel.service.OrderDetService;
import com.angel.service.OrderService;

@Controller
@RequestMapping("/order")
public class OrderAction {
	private static final Logger logger = LoggerFactory.getLogger(OrderAction.class);
	

	@Resource
	private OrderService orderService;
	
	@Resource
	private OrderDetService orderDetService;
	
	@RequestMapping("/orderList")
	@ResponseBody
	public Pagination<OrderDto> orderList(@RequestBody OrderDto query,@SessionAttribute Shop shop) {
		System.out.println(JSON.toJSONString(query));
		Pagination<OrderDto> pg=new Pagination<OrderDto>();
		if(shop.getId()==null){
			logger.error("没有参数");
			return pg;
		}
		query.setShopid(shop.getId());
		return this.orderService.findOrderPg(query);
	}
	
	
	@RequestMapping("/orderDet")
	@ResponseBody
	public OrderDto orderDet(Long id,@SessionAttribute Shop shop) {
		OrderDto order= this.orderService.getOrder(id);
		if(order!=null){
			OrderDetDto detDto=new OrderDetDto();
			detDto.setOrderid(order.getId());
			detDto.setStart(0);
			detDto.setLimit(200);
			List<OrderDet> detList=this.orderDetService.findOrderDetList(detDto);
			order.setOrderDet(detList);
		}
		return order;
	}
	
	
	
	@RequestMapping(value = "/payOrder")
	@ResponseBody
	public ResponeMsg payOrder(@RequestBody Order query) throws Exception {
		ResponeMsg msg = new ResponeMsg();
		if(StringUtils.isNotBlank(query.getReamount()) && query.getId()!=null){
			Order updateOrder=new Order();
			updateOrder.setId(query.getId());
			updateOrder.setReamount(query.getReamount());
			updateOrder.setStaus(4);
			this.orderService.updateOrder(updateOrder);
			msg.setStatus(ResponeMsg.sus);
		}else{
			msg.setStatus(ResponeMsg.fail);
			msg.setErrMsg("更新失败");
		}
		return msg;
	}
	
	@RequestMapping(value = "/delOrder")
	@ResponseBody
	public ResponeMsg delOrder(@RequestBody OrderDto query) throws Exception {
		ResponeMsg msg = new ResponeMsg();
		return msg;
	}
	

	
}
