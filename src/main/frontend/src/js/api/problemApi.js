import {AxiosApi} from "../setup/api/ApiCommon";

function problemApi(){
    const axiosApi = AxiosApi();
    return {
        getProblem: async (body)=>{
            return axiosApi.post(`/api/v1/problem`, body, null);
        },
        loadBaekjoon: async ()=>{
            return axiosApi.get(`/api/v1/problem/reload`, null);
        },
        getWeeklyProblemSolved: async (date)=>{
            return axiosApi.get(`/api/v1/problem/weekly/solved?date=${date}`);
        },
        getWeeklyProblem: async (date)=>{
            return axiosApi.get(`/api/v1/problem/weekly?date=${date}`, null);
        },
        updateWeeklyProblem: async (date, body)=>{
            return axiosApi.post(`/api/v1/problem/weekly?date=${date}`, body, null);
        },
        searchProblems: async (keyword)=>{
            return axiosApi.get(`/api/v1/problem/search?keyword=${keyword}`, null);
        },
        getUsersByProblem: async (problemId)=>{
            return axiosApi.get(`/api/v1/problem/users/solved?problemId=${problemId}`, null);
        },
        getProblemSource: async (submitId)=>{
            return axiosApi.get(`/api/v1/problem/source?submitId=${submitId}`, null);
        }
    }
}

export default problemApi;