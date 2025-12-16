package com.hanco.hanco.mapper;

import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    // user
    public List<Map<String, Object>> getAllUsers(String date);

    public List<Map<String, Object>> getContinuousCompleteCount();

    public List<Map<String, Object>> getAllUsersLastRead();

    public void updateLastRead(String id, Integer lastRead);

    public String findPassword(String id);

    public int updatePassword(String id, String newPwd);
}
