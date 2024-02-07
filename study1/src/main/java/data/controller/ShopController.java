package data.controller;

import java.util.LinkedHashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
	
	@GetMapping("/data")
	public List<ShopVo> getDatas(ShopVo vo){
		
		return shopService.getDatas(vo);
	}
	
	
	@GetMapping("/filter")
	public List<ShopVo> filterDatas(@RequestParam("filter") String filter, @RequestParam("search") String search,ShopVo vo) {
	    return shopService.getDatas(vo);
	}
	
	@GetMapping("/shopcode")
	public List<LinkedHashMap<String, String>> getShopCodeData() {
	    return shopService.getCodes();
	}
	
	 @PostMapping("/add")
	    public void addShop(@RequestBody ShopVo shopVo) {
	        shopService.addShop(shopVo);
	    }
	 
	  @PostMapping("/update")
	    public void updateShop(@RequestBody ShopVo shopVo) {
	        shopService.updateShop(shopVo);
	    }
	 @DeleteMapping("/delete")
	 public void deleteShop(@RequestParam int num) {
		 shopService.deleteShop(num);
	 }
}
