package com.angel.controll;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.angel.common.ResponeMsg;
import com.angel.dto.CatogryDto;
import com.angel.dto.FoodDto;
import com.angel.dto.OrderDto;
import com.angel.dto.ShopDto;
import com.angel.service.CatogryService;
import com.angel.service.FoodService;
import com.angel.service.OrderService;
import com.angel.service.ShopService;


/**
 
   手机端程序使用
 
 */

@Controller
@RequestMapping("/mo")
public class MobileAction {
	private static final Logger logger = LoggerFactory.getLogger(MobileAction.class);
	
	@Resource
	private FoodService foodService;
	
	@Resource
	private CatogryService catogryService;
	
	@Resource
	private ShopService shopService;
	

	@Resource
	private OrderService orderService;
	
	
	
	@RequestMapping("/foodList")
	@ResponseBody
	public List<FoodDto> foodList( FoodDto query) {
		List<FoodDto> list=new ArrayList<FoodDto>();
		if(query.getShopid()==null && query.getCatogryid()==null && StringUtils.isEmpty(query.getpName())){
			logger.error("没有参数");
			return list;
		}
		list=this.foodService.findFoodList(query);
		System.out.println("size:"+list.size());
		return list;
	}
	
	

	@RequestMapping("/catogryList")
	@ResponseBody
	public List<CatogryDto> foodList(Long shopId) {
		List<CatogryDto> list=new ArrayList<CatogryDto>();
		if(shopId==null){
			logger.error("没有参数");
			return list;
		}
		CatogryDto dto=new CatogryDto();
		dto.setShopid(shopId);
		dto.setStart(0);
		dto.setLimit(100);
		list=this.catogryService.findCatogryList(dto);
		return list;
	}
	
	
	
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
	
	
	
	
	@RequestMapping("/shopDet")
	@ResponseBody
	public ShopDto shopDet(Long id) {
		return this.shopService.getShop(id);
	}


}
