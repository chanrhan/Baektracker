import {AxiosApi} from "../setup/api/ApiCommon";

function weeklyResultApi() {
    const axiosApi = AxiosApi();
    return {
        updateWeekPass: async (id, state, pwd) => {
            return axiosApi.post(`/api/v1/weekly-result/pass`, {
                id: id,
                date: new Date(),
                password: pwd,
                activate: state === 1
            });
        },
        getTotalFine: async () => {
            return axiosApi.get(`/api/v1/weekly-result/fine/total`, null);
        },
        getMonthFine: async (date) => {
            return axiosApi.get(`/api/v1/weekly-result/fine/month?date=${date}`, null);
        }
    }
}

export default weeklyResultApi;
