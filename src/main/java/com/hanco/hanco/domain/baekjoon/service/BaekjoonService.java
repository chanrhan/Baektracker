package com.hanco.hanco.domain.baekjoon.service;

import com.hanco.hanco.common.util.TimeUtils;
import com.hanco.hanco.domain.problem.enums.SolvedAcResultType;
import com.hanco.hanco.domain.problem.model.BaekjoonProblem;
import com.hanco.hanco.domain.problem.model.SolvedProblem;
import com.hanco.hanco.domain.problem.repository.ProblemRepository;
import com.hanco.hanco.domain.problem.repository.SolvedProblemRepository;
import com.hanco.hanco.domain.problem.service.ProblemService;
import com.hanco.hanco.domain.user.model.User;
import com.hanco.hanco.domain.user.repository.UserRepository;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BaekjoonService {
    private final ProblemService problemService;
    private final SolvedProblemRepository solvedProblemRepository;
    private final ProblemRepository problemRepository;
    private final UserRepository userRepository;
    private static final String gRecaptchaResponse = "03AFcWeA5mQSaepuaaR7U57_-xDPkMdoyyCHIw-GzIjiJwJ7dc85B0DUuLfj25b1CsGB_9zUOTXZ4P6eAbCq-ySOvJt1hLaCt_lXXzQPclXypdWyy4cOHmb9AmWrneWc6oDQ2eeGlWyg_ziSQlaLJgZDHAIE2T1h5NG5PXasZgvRv8q7bsOqv_tI4YqnjDJW0qyeDb-NveASxddrqUYRB0jKb2je7g-OBRafdGjNgwrhWP8Wgw7i_twMZjYdS2VOhkQtUwu2N88qbcNlt9sboHFKBHEDkcIE2cfDQ5dB7s7lYH5H1CJPGmqqNxAiF6A-ssV5z0Cpd8tg-d_clgwVDC-QsKZ6RQLJmAG0h5_IIXH-CsVoFeTTcodslWXcTJofA7eKN5OhGo8oOTjYUs7kjvhDJi4if6_ohi4oriDa1R_vm_R9mCH3bxSlXTWXBEkf37n6_PiVwfVYk5oucLgDORbhGllQ_7DEZr3wF3NGqlcL5y9ITpNH-cWJYpPA6ZA-_a_Pq_WbDgr5DTbwsN5j258djDcdD_vB4bElyaKWS812nNLFYTyFTyssfLiTE13w5k0qpm2L-gAbrOrJaxdIOZj6WMhKiLmm4K0pEZ-hEDNNQZ_UU835Ia95ArXHm5gl9ruzvF8PZBm4kKsosP3y3eRuSdT0NBALJ4eRGbxp56RPmMjMkqR7_19moOIgqN0p-q2cSRatqj9kH7qKeYNh7a39aE7kPSuX5XVIBVekrqKwPlAOdb2ueFS6iC5qa0xq9a4epJRhZfLZKI0-t6H6fdupuEQY54co-bEK0ypEMxYSS7VKNHMiwqsJfR0aH2P9V4TLIZlIpzHILioY9SzOwDMM6N26B_zpXh_etnVSG4Qya0HTVNC-45a_DVe4La9RM5oDKCzfyGhF1FUfFX-Zm9z7Ye7Fp-Z9r6hKDT_I7o4WlQC_OSVUCveuYFkeH5sEbxzJ6G6hVXgI0A-RZBHwKxdBH1MG1UizNWdw\n";
    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    private static final String Baekjoon_Problem_Status_Page_URL = "https://www.acmicpc.net/status";

    public void loadBaekjoonProblemStatus() {
        try {
            List<SolvedProblem> list = new ArrayList<>();

            List<User> users = userRepository.findAll();
            for (User user : users) {
                List<SolvedProblem> scrappedProblems = new ArrayList<>();
                int top = -1;
                do {
                    List<SolvedProblem> res = scrapProblemPage(user, top, user.getLastRead());
                    if (res == null || res.isEmpty()) {
                        break;
                    }
                    scrappedProblems.addAll(res);
                    top = res.get(res.size() - 1).getSubmitId();
                } while (true);

                list.addAll(scrappedProblems);

                if (!scrappedProblems.isEmpty()) {
                    int updatedLastRead = scrappedProblems.get(0).getSubmitId();
                    user.updateLastRead(updatedLastRead);
                }
            }
            if (!list.isEmpty()) {
                solvedProblemRepository.saveAll(list);
//                problemMapper.insertMarkedProblems(list);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private List<SolvedProblem> scrapProblemPage(User user, int top, int lastReadIndex)
            throws IOException {
        Connection connection = Jsoup.connect(
                Baekjoon_Problem_Status_Page_URL + "?user_id=" + user.getUsername() + "&top=" + top);
        Document document = connection.get(); // GET 으로 요청하고, 요청 결과를 Document 객체로 반환
        Elements elements = document.getElementsByAttributeValue("id", "status-table");
        Element element = elements.get(0);

        Element tbody = element.children().get(1);
        List<SolvedProblem> list = new ArrayList<>();
        try {
            int maxLength = tbody.children().size();
            for (int i = 0; i < maxLength; ++i) {
                Element row = tbody.child(i);
                Elements selects = row.select("td a.real-time-update.show-date");

                if (selects != null) {
                    Element a = selects.get(0);
                    long timestamp = Long.parseLong(a.attr("data-timestamp"));
                    LocalDate dateTime = TimeUtils.parseTimestamp(timestamp).toLocalDate();
                    Elements tds = row.select("td");
                    int submitId = Integer.parseInt(tds.get(0).text());

                    if (submitId == top) {
                        continue;
                    }

                    if (submitId <= lastReadIndex) {
                        break;
                    }
                    int problemId = Integer.parseInt(tds.get(2).text());

                    BaekjoonProblem baekjoonProblem = problemService.getProblemOrInsert(problemId);

                    String resultText = tds.get(3).text();
                    String result = tds.get(3).child(0).attr("data-color");

                    SolvedAcResultType resultType = null;
                    int elapsedTime = 0;
                    int usedMemory = 0;
                    String errorText = null;
                    String lang = null;
                    try {
                        resultType = result.equals("ac") ? SolvedAcResultType.CORRECT : SolvedAcResultType.WRONG;
                        usedMemory = Integer.parseInt(tds.get(4).text());
                        elapsedTime = Integer.parseInt(tds.get(5).text());
                        lang = tds.get(6).select("td").text();
                    } catch (IllegalArgumentException e) {
                        // 일치하는 Enum 이 없을 경우
                        SolvedAcResultType.ErrorType errorType = SolvedAcResultType.getErrorType(resultText);
                        resultType = errorType.getType();
                        errorText = errorType.getErrorText();
                    } catch (NullPointerException e) {

                    }

                    if (resultType == null) {
                        continue;
                    }

                    SolvedProblem solvedProblem = SolvedProblem.builder()
                            .submitId(submitId)
                            .resultId(resultType.getStatus())
                            .elapsedTime(elapsedTime)
                            .usedMemory(usedMemory)
                            .errTxt(errorText)
                            .user(user)
                            .tryDt(dateTime)
                            .language(lang)
                            .problem(baekjoonProblem)
                            .build();
//                    BaekjoonSolvedProblemInfo problemInfo = BaekjoonSolvedProblemInfo.builder()
//                            .username(username)
//                            .problemId(problemId)
//                            .resultId(resultType.getStatus())
//                            .elapsedTm(elapsedTime)
//                            .usedMem(usedMemory)
//                            .errorText(errorText)
//                            .submitId(submitId)
//                            .date(dateTime.format(formatter))
//                            .lang(lang)
//                            .build();
                    list.add(solvedProblem);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

        return list;
    }

    private List<Map<String, Object>> scrapProblemCodeDetail(int submitId) {
        System.out.println("submit id: " + submitId);
        String userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36";
        Map<String, String> commonHeader = new HashMap<>();
        commonHeader.put("Accept",
                "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7");
        commonHeader.put("Accept-Encoding", "gzip, deflate, br, zstd");
        commonHeader.put("Accept-Language", "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7");

        Map<String, String> formData = new HashMap<>();
        formData.put("login_user_id", "km1104rs@naver.com");
        formData.put("login_password", "gmlcks0915");
        formData.put("next", "/source/" + submitId);
        formData.put("stack", "0");
        formData.put("g-recaptcha-response", gRecaptchaResponse);
        try {
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
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }
}
