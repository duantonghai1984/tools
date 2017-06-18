package com.angel;

import java.util.List;

import javax.annotation.Resource;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import com.angel.dto.FoodDto;
import com.angel.mo.Order;
import com.angel.service.FoodService;
import com.angel.service.OrderService;




@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@SpringBootTest(classes = AngelApplication.class)
public class ForderTest {

	@Resource
	private OrderService orderService;
	
	@Resource
	private FoodService foodService;
	
	@Test
	public void testInsert(){
		/*Order order=new Order();
		order.setShopid(1);
		order.setCount(2);
		order.setAmount("20");
		Long id=this.orderService.createOrder(order);
		System.out.println(id);*/
		FoodDto dto=new FoodDto();
		dto.setpName("韭菜炒");
		List<FoodDto> list=this.foodService.findFoodList(dto);
		System.out.println(list.size());
	}
	
	
	
}
