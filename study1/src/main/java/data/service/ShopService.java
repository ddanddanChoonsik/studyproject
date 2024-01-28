/**
 * 
 */
package data.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import data.mapper.ShopMapper;
import data.vo.ShopVo;

/**
 * @author Siyeon
 *
 */
@Service
public class ShopService implements ShopServiceInter {

	@Autowired
	private ShopMapper shopMapper;
	
	
	@Override
	public List<ShopVo> getDatas(ShopVo vo) {
		// TODO Auto-generated method stub
		 if (vo.getFilter() != null && !vo.getFilter().isEmpty()) {
		        vo.setFilterItems(vo.getFilter().split(","));
		    }
		 
		 System.out.println(shopMapper.getDatas(vo));
		    return shopMapper.getDatas(vo);
}
}
