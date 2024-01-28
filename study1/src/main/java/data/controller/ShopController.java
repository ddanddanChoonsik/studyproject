package data.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import data.service.ShopService;
import data.vo.ShopVo;

@RestController
@CrossOrigin
@RequestMapping("/shop")
public class ShopController {
	
	@Autowired
	private ShopService shopService;
	
	@GetMapping("/getDatas")
	public List<ShopVo> getDatas(ShopVo vo){
		
		System.out.println(shopService.getDatas(vo));
		return shopService.getDatas(vo);
	}
	
	@GetMapping("/filterDatas")
	public List<ShopVo> filterDatas(@RequestParam(name = "filter", required = false) String filter) {
	    ShopVo vo = new ShopVo();
	    vo.setFilter(filter);
	    if (filter != null && !filter.isEmpty()) {
	        vo.setFilterItems(filter.split(","));
	    }
	    System.out.println("Filter Value: " + filter);
	    return shopService.getDatas(vo);
	}
}
