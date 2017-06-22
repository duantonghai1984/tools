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

import com.angel.dto.FoodDto;
import com.angel.service.FoodService;

@Controller
public class FoodController {
	private static final Logger logger = LoggerFactory.getLogger(FoodController.class);
	
	@Resource
	private FoodService foodService;
	
	
	
	
	
}
