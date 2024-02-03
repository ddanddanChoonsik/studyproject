package data.mapper;

import java.util.LinkedHashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import data.vo.ShopVo;

@Mapper
public interface ShopMapper{
	 List<ShopVo> getDatas(ShopVo vo);
	 List<ShopVo> getCodes();
	 void insertShop(ShopVo shopVo);
	 void updateShop(@Param("num") int num, @Param("shopVo") ShopVo shopVo);
	 
}
