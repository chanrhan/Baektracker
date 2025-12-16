import {AxiosApi} from "../setup/api/ApiCommon";

function problemApi() {
    const axiosApi = AxiosApi();
    return {
        getWeeklyUsersProgress: async (date) => {
            return axiosApi.get(`/api/v1/problem?date=${date}`, null);
        },
        loadBaekjoon: async () => {
            return axiosApi.get(`/api/v1/problem/reload`, null);
        },
        // getWeeklyProblemSolved: async (date) => {
        //     return axiosApi.get(`/api/v1/problem/weekly/solved?date=${date}`);
        // },
        getWeeklyProblem: async (date) => {
            return axiosApi.get(`/api/v1/weekly-problem?date=${date}`, null);
        },
        updateWeeklyProblem: async (date, body) => {
            return axiosApi.post(`/api/v1/problem/weekly?date=${date}`, body, null);
        },
        searchProblems: async (keyword) => {
            return axiosApi.get(`/api/v1/problem/search?keyword=${keyword}`, null);
        }
    }
}

export default problemApi;