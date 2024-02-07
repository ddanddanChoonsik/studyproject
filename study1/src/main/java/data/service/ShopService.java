package data.service;

import java.util.LinkedHashMap;
import java.util.List;

import data.vo.ShopVo;

public interface ShopService {
	
	List<ShopVo> getDatas(ShopVo vo);
	List<LinkedHashMap<String, String>> getCodes();
	void addShop(ShopVo shopVo);
	void updateShop(ShopVo shopVo);
	void deleteShop(int num);
}
