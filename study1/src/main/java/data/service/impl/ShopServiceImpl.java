/**
 * 
 */
package data.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
