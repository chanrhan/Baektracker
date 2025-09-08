import {AxiosApi} from "../setup/api/ApiCommon";

function userApi(){
    const axiosApi = AxiosApi();
    return {
        getAllUsers: async (date)=> {
            return axiosApi.get(`/api/v1/user?date=${date}`);
        },
        grantPassThisWeek: async (id, state, pwd)=> {
            return axiosApi.post(`/api/v1/user/pass/${id}/${state}`, pwd);
        },
    }
}

export default userApi;