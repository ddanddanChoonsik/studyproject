package data.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import data.vo.ShopVo;

@Mapper
public interface ShopMapper{
	 List<ShopVo> getDatas(ShopVo vo);
}
