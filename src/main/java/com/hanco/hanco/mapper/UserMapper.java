package com.hanco.hanco.mapper;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    public String findPassword(String username);
}
