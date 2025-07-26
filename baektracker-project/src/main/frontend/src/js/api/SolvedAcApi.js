import {AxiosApi} from "../setup/api/ApiCommon";

function SolvedAcApi(){
    const axiosApi = AxiosApi();
    return {
        getAllUsers: async (date)=>{
            return axiosApi.get(`/api/v1/solved-ac/user?date=${date}`);
        },
        getWeeklySharedSolved: async (date)=>{
            return axiosApi.get(`/api/v1/solved-ac/shared-problem/weekly-solved?date=${date}`);
        },
        getProblem: async (body)=>{
            return axiosApi.post(`/api/v1/solved-ac/problem`, body, null);
        },
        loadBaekjoon: async ()=>{
            return axiosApi.get(`/api/v1/solved-ac/reload`, null);
        },
        getSharedProblem: async (date)=>{
            return axiosApi.get(`/api/v1/solved-ac/shared-problem?date=${date}`, null);
        },
        updateSharedProblem: async (date, body)=>{
            return axiosApi.post(`/api/v1/solved-ac/shared-problem?date=${date}`, body, null);
        },
        getTotalFine: async ()=>{
            return axiosApi.get(`/api/v1/solved-ac/fine/total`, null);
        },
        getMonthFine: async (date)=>{
            return axiosApi.get(`/api/v1/solved-ac/fine/month?date=${date}`, null);
        },
        getWeeklyResult: async (date)=>{
            return axiosApi.get(`/api/v1/solved-ac/fine/week?date=${date}`, null);
        },
        getProblemInfoList: async (keyword)=>{
            return axiosApi.get(`/api/v1/solved-ac/problem/info/list?keyword=${keyword}`, null);
        }
    }
}

export default SolvedAcApi;