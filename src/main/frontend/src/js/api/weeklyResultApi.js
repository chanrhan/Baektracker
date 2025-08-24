import {AxiosApi} from "../setup/api/ApiCommon";

function weeklyResultApi(){
    const axiosApi = AxiosApi();
    return {

        getTotalFine: async ()=>{
            return axiosApi.get(`/api/v1/weekly-result/fine/total`, null);
        },
        getMonthFine: async (date)=>{
            return axiosApi.get(`/api/v1/weekly-result/fine/month?date=${date}`, null);
        },
        getWeeklyResult: async (date)=>{
            return axiosApi.get(`/api/v1/weekly-result/fine/week?date=${date}`, null);
        }
    }
}

export default weeklyResultApi;