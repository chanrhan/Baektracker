package com.hanco.hanco.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hanco.hanco.enums.SolvedAcResultType;
import com.hanco.hanco.mapper.SolvedAcMapper;
import com.hanco.hanco.util.ExternalApiUtils;
import com.hanco.hanco.util.TimeUtils;
import com.hanco.hanco.vo.SolvedAcRequestVO;
import com.hanco.hanco.vo.SolvedAcResponseVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@RequiredArgsConstructor
@Log4j2
public class SolvedAcService {
	private final SolvedAcMapper solvedAcMapper;
    private final ObjectMapper objectMapper = new ObjectMapper();
    private static final String gRecaptchaResponse = "03AFcWeA5mQSaepuaaR7U57_-xDPkMdoyyCHIw-GzIjiJwJ7dc85B0DUuLfj25b1CsGB_9zUOTXZ4P6eAbCq-ySOvJt1hLaCt_lXXzQPclXypdWyy4cOHmb9AmWrneWc6oDQ2eeGlWyg_ziSQlaLJgZDHAIE2T1h5NG5PXasZgvRv8q7bsOqv_tI4YqnjDJW0qyeDb-NveASxddrqUYRB0jKb2je7g-OBRafdGjNgwrhWP8Wgw7i_twMZjYdS2VOhkQtUwu2N88qbcNlt9sboHFKBHEDkcIE2cfDQ5dB7s7lYH5H1CJPGmqqNxAiF6A-ssV5z0Cpd8tg-d_clgwVDC-QsKZ6RQLJmAG0h5_IIXH-CsVoFeTTcodslWXcTJofA7eKN5OhGo8oOTjYUs7kjvhDJi4if6_ohi4oriDa1R_vm_R9mCH3bxSlXTWXBEkf37n6_PiVwfVYk5oucLgDORbhGllQ_7DEZr3wF3NGqlcL5y9ITpNH-cWJYpPA6ZA-_a_Pq_WbDgr5DTbwsN5j258djDcdD_vB4bElyaKWS812nNLFYTyFTyssfLiTE13w5k0qpm2L-gAbrOrJaxdIOZj6WMhKiLmm4K0pEZ-hEDNNQZ_UU835Ia95ArXHm5gl9ruzvF8PZBm4kKsosP3y3eRuSdT0NBALJ4eRGbxp56RPmMjMkqR7_19moOIgqN0p-q2cSRatqj9kH7qKeYNh7a39aE7kPSuX5XVIBVekrqKwPlAOdb2ueFS6iC5qa0xq9a4epJRhZfLZKI0-t6H6fdupuEQY54co-bEK0ypEMxYSS7VKNHMiwqsJfR0aH2P9V4TLIZlIpzHILioY9SzOwDMM6N26B_zpXh_etnVSG4Qya0HTVNC-45a_DVe4La9RM5oDKCzfyGhF1FUfFX-Zm9z7Ye7Fp-Z9r6hKDT_I7o4WlQC_OSVUCveuYFkeH5sEbxzJ6G6hVXgI0A-RZBHwKxdBH1MG1UizNWdw\n";

    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    private static final String Baekjoon_Problem_Status_Page_URL = "https://www.acmicpc.net/status";
    private static final String Baekjoon_Problem_Source_Page_URL = "https://www.acmicpc.net/source";
    private static final String Solved_ac_user_show_URL = "https://solved.ac/api/v3/search/user?query=";

    public List<Map<String,Object>> getProblemSource(int submitId){
        return scrapProblemCodeDetail(submitId);
    }

    public List<Map<String,Object>> getUsersByProblem(Integer id){
        return solvedAcMapper.getUsersByProblem(id);
    }

    public List<Map<String,Object>> getProblemInfoList(String keyword){
        return solvedAcMapper.getProblemInfoList(keyword);
    }

    public void insertWeeklyScore(int target, int fine){
        solvedAcMapper.insertWeeklyScore(target, fine);
    }

    public String getWeeklySharedSolved(String date){
        return solvedAcMapper.getWeeklySharedSolved(date);
    }

    public List<Map<String,Object>> getTotalFine(){
        return solvedAcMapper.getTotalFine();
    }

    public List<Map<String,Object>> getMonthFine(String date){
        return solvedAcMapper.getMonthFine(date);
    }

    public List<Map<String,Object>> getWeeklyResult(String date){
        return solvedAcMapper.getWeeklyResult(date);
    }

    @Transactional
    public int updateSharedProblem(String date, List<Integer> list){
        int rst = solvedAcMapper.deleteSharedProblemAll(date);
        solvedAcMapper.insertSharedProblem(date, list);
        return rst;
    }

    @Transactional
    public List<Map<String,Object>> getSharedProblem(String date){
        List<Map<String,Object>> sp_list = solvedAcMapper.getSharedProblem(date);
        for(Map<String,Object> item : sp_list){
//            System.out.println("shared: "+item);
            if(Objects.isNull(item.get("title")) || !StringUtils.hasText(item.get("title").toString())){
                try{
                    int problemId = Integer.parseInt(item.get("problem_id").toString());
                    Map<String,Object> problemInfo = getProblemInfo(problemId);
//                    System.out.println("pr:"+problemInfo);
                    String title = problemInfo.get("titleKo").toString();
                    int level = Integer.parseInt(problemInfo.get("level").toString());
                    item.put("title", title);
                    item.put("level", level);
                    solvedAcMapper.insertBaekjoonProblem(problemId, title, level);
                }catch (NullPointerException e){
                    e.printStackTrace();
                }
            }
        }
        return sp_list;
    }

    public List<Map<String,Object>> getAllUsers(String date){
        List<Map<String,Object>> users = solvedAcMapper.getAllUsers(date);
        for (Map<String,Object> user : users){
            String uri = Solved_ac_user_show_URL + user.get("id").toString();
            try {
//                System.out.println("aaa request : " + uri);
                Map<String,Object> res = ExternalApiUtils.solvedacAPIRequest(uri);
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
//        System.out.println("before sort : " + users);
        users.sort((m1, m2)->{
            try{
                int tier1 = m1.containsKey("tier") ? Integer.parseInt(m1.get("tier").toString()) : - 100;
                int tier2 = m2.containsKey("tier") ? Integer.parseInt(m2.get("tier").toString()) : -100;
//                System.out.println("tier1 : " + tier1 + ", tier2 : " + tier2);
                return Integer.compare(tier2, tier1);
            }catch (NumberFormatException | NullPointerException e){
                e.printStackTrace();
                return 0;
            }
        });
//        System.out.println("after sort : " + users);


        return users;
    }
//
//	public Map<String,Object> getLoginedUserInfo(String username){
////		String uri = "https://solved.ac/api/v3/account/verify_credentials";
//        String uri = "https://solved.ac/api/v3/search/user?query="+username;
//
//    }

    public Map<String, Object> getProblemInfo(int problemId){
        String uri = "https://solved.ac/api/v3/problem/show?problemId="+problemId;
        try {
            Map<String,Object> info = ExternalApiUtils.solvedacAPIRequest(uri);
            System.out.println("ppp sprout: " + info.get("sprout"));
            if(info != null && info.get("sprout").equals(true)){

                info.put("level", "-"+info.get("level").toString());
            }
            System.out.println("ppp: "+info);
            return info;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public List<Map<String,Object>> getProblems(SolvedAcRequestVO vo){
        return solvedAcMapper.getBaekjoonProblems(vo);
    }

    public int loadBaekjoonProblemStatus(){
        int count = 0;
        try {
            List<SolvedAcResponseVO> list = new ArrayList<>();

            List<Map<String,Object>> lastReads = solvedAcMapper.getAllUsersLastRead();
            for(Map<String,Object> map :lastReads){
                String username = map.get("id").toString();
                int lastRead = Integer.parseInt(map.get("last_read").toString());
//                System.out.println("id: "+username+",lr: "+lastRead);
                List<SolvedAcResponseVO> scrappedProblems = new ArrayList<>();
                int top = -1;
                do{
                    List<SolvedAcResponseVO> res = scrapBaekjoon(username, top, lastRead);
//                    System.out.println(res);
                    if(res == null || res.isEmpty()){
                        break;
                    }
                    scrappedProblems.addAll(res);
                    int bottom = res.get(res.size()-1).getSubmitId();
//                    if(bottom <= lastRead){
//                        break;
//                    }
                    top = bottom;
                }while (true);
                count += scrappedProblems.size();
                list.addAll(scrappedProblems);
                if(!scrappedProblems.isEmpty()){
                    int updatedLastRead = scrappedProblems.get(0).getSubmitId();
                    solvedAcMapper.updateLastRead(username, updatedLastRead);
                }
            }
            if(!list.isEmpty()){
                solvedAcMapper.insertMarkedProblems(list);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return -1;
        }
        return count;
    }

    private List<SolvedAcResponseVO> scrapBaekjoon(String username, int top, int lastReadIndex) throws IOException {
        if(username == null || username.isEmpty()){
            return null;
        }
//        System.out.println("username: "+username+", top:" + top);
        Connection connection = Jsoup.connect(Baekjoon_Problem_Status_Page_URL + "?user_id="+username+"&top="+top);
        Document document = connection.get(); // GET 으로 요청하고, 요청 결과를 Document 객체로 반환
        Elements elements = document.getElementsByAttributeValue("id","status-table");
        Element element = elements.get(0);

        Element tbody = element.children().get(1);
        List<SolvedAcResponseVO> list = new ArrayList<>();
        try{
            int maxLength = tbody.children().size();
            for(int i=0;i<maxLength;++i){
                Element row = tbody.child(i);
//                System.out.println(row);
                Elements selects = row.select("td a.real-time-update.show-date");

                if(selects != null){
                    Element a = selects.get(0);
                    long timestamp = Long.parseLong(a.attr("data-timestamp"));
                    LocalDate dateTime = TimeUtils.parseTimestamp(timestamp).toLocalDate();
                    Elements tds = row.select("td");
                    int submitId = Integer.parseInt(tds.get(0).text());

                    if(submitId == top){
                        continue;
                    }

                    if(submitId <= lastReadIndex){
                        break;
                    }
                    int problemId = Integer.parseInt(tds.get(2).text());
                    if(!solvedAcMapper.existBaekjoonProblem(problemId)){
                        Map<String,Object> problemInfo = getProblemInfo(problemId);
                        String problemTitle = problemInfo.get("titleKo").toString();
                        int problemLevel = Integer.parseInt(problemInfo.get("level").toString());
                        solvedAcMapper.insertBaekjoonProblem(problemId, problemTitle, problemLevel);
                    }

                    String resultText = tds.get(3).text();
                    SolvedAcResultType resultType = null;
                    int elapsedTime = 0;
                    int usedMemory = 0;
                    String errorText = null;
                    String lang = null;
                    try{
                        resultType = SolvedAcResultType.of(resultText);
                        usedMemory =  Integer.parseInt(tds.get(4).text());
                        elapsedTime = Integer.parseInt(tds.get(5).text());
                        System.out.println(tds.get(6));
                        lang = tds.get(6).select("td").text();
                    }catch (IllegalArgumentException e){
                        // 일치하는 Enum 이 없을 경우
                        SolvedAcResultType.ErrorType errorType = SolvedAcResultType.getErrorType(resultText);
                        resultType = errorType.getType();
                        errorText = errorType.getErrorText();
                    }catch (NullPointerException e){

                    }

                    if(resultType == null){
                        continue;
                    }

                    SolvedAcResponseVO vo = SolvedAcResponseVO.builder()
                            .username(username)
                            .problemId(problemId)
                            .resultId(resultType.getStatus())
                            .elapsedTm(elapsedTime)
                            .usedMem(usedMemory)
                            .errorText(errorText)
                            .submitId(submitId)
                            .date(dateTime.format(formatter))
                            .lang(lang)
                            .build();
                    list.add(vo);
                }
            }
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }

        return list;
    }

    private List<Map<String,Object>> scrapProblemCodeDetail(int submitId) {
        System.out.println("submit id: " +submitId);
        String userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36";
        Map<String,String> commonHeader = new HashMap<>();
        commonHeader.put("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7");
        commonHeader.put("Accept-Encoding", "gzip, deflate, br, zstd");
        commonHeader.put("Accept-Language", "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7");

        Map<String,String> formData = new HashMap<>();
        formData.put("login_user_id", "km1104rs@naver.com");
        formData.put("login_password", "gmlcks0915");
        formData.put("next", "/source/"+submitId);
        formData.put("stack", "0");
        formData.put("g-recaptcha-response", gRecaptchaResponse);
        try{
            Connection.Response connResponse = Jsoup.connect("https://www.acmicpc.net/signin")
                    .userAgent(userAgent)
                    .timeout(5000)
                    .data(formData)
                    .method(Connection.Method.POST)
                    .headers(commonHeader)
                    .execute();
            System.out.println(connResponse.statusCode());
            System.out.println(connResponse.statusMessage());
            System.out.println(connResponse.body());
        }catch (Exception e){
            e.printStackTrace();
        }


        return null;
    }

}
