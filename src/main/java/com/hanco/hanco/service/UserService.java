package com.hanco.hanco.service;

import com.hanco.hanco.mapper.UserMapper;
import com.hanco.hanco.util.ExternalApiUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserService {
    private final SolvedAcService solvedAcService;
    private final UserMapper userMapper;
    private static final String PASS_PWD = "\"091504\"";
//    private static final String Solved_ac_user_show_URL = "https://solved.ac/api/v3/search/user?query=";

    public Boolean grantPassThisWeek(String userId, int state, String password){
        System.out.println("pwd: "+ password);
        System.out.println("pwd2: "+ PASS_PWD);
        if(password.equals(PASS_PWD)){
            System.out.println("success");
            return userMapper.grantPassThisWeek(userId, state) > 0;
        }
        return false;
    }

    public List<Map<String,Object>> getAllUsers(String date){
        List<Map<String,Object>> users = userMapper.getAllUsers(date);
        for (Map<String,Object> user : users){
//            String uri = Solved_ac_user_show_URL + user.get("id").toString();
            try {
//                System.out.println("aaa request : " + uri);
                Map<String,Object> res = solvedAcService.searchUsers(user.get("id").toString());
//                System.out.println(res);
                Map<String,Object> item = ((List<Map<String, Object>>)res.get("items")).get(0);
                if(item != null && !item.isEmpty()){
                    user.put("solved_count", item.get("solvedCount"));
                    user.put("tier", item.get("tier"));
                }else{
                    user.put("solved_count", 0);
                    user.put("tier", 0);
                }

            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        users.sort((m1, m2)->{
            try{
                int tier1 = m1.containsKey("tier") ? Integer.parseInt(m1.get("tier").toString()) : - 100;
                int tier2 = m2.containsKey("tier") ? Integer.parseInt(m2.get("tier").toString()) : -100;
                return Integer.compare(tier2, tier1);
            }catch (NumberFormatException | NullPointerException e){
                e.printStackTrace();
                return 0;
            }
        });
//        System.out.println("after sort : " + users);


        return users;
    }
}
