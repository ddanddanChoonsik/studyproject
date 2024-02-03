/**
 * 
 */
package data.service.impl;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.ModelAndView;

import data.mapper.ShopMapper;
import data.service.ShopService;
import data.vo.ShopVo;

/**
 * @author Siyeon
 *
 */
@Service
public class ShopServiceImpl implements ShopService {

	@Autowired
	private ShopMapper shopMapper;
	
	@Override
	public List<ShopVo> getDatas(ShopVo vo){
		// TODO Auto-generated method stub
		 if (vo.getFilter() != null && !vo.getFilter().isEmpty()) {
		        vo.setFilterItems(vo.getFilter().split(","));
		    }else if (vo.getSearch()!= null && vo.getSearch().isEmpty()) {
		    	vo.setSearch(vo.getSearch());
		    }
		 	List<ShopVo> list = shopMapper.getDatas(vo);
		 	System.out.println(list);
		    return list;
		}
	
	@Override
	 public List<LinkedHashMap<String, String>> getCodes() {
        List<ShopVo> shopVoList = shopMapper.getCodes();

        List<LinkedHashMap<String, String>> result = new ArrayList<>();

        for (ShopVo shopVo : shopVoList) {
            LinkedHashMap<String, String> map = new LinkedHashMap<>();
            map.put("filter_cat", shopVo.getFilter_cat());
            map.put("filter_name", shopVo.getFilter_name());
            result.add(map);
        }

        return result;
    }
	
	@Override
	 public void addShop(ShopVo shopVo) {
        shopMapper.insertShop(shopVo);
    }
	
	 @Override
	    public void updateShop(int num, ShopVo shopVo) {
	        shopMapper.updateShop(num, shopVo);
	    }
}
