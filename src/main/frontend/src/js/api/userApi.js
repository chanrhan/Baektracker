import {AxiosApi} from "../setup/api/ApiCommon";

function userApi(){
    const axiosApi = AxiosApi();
    return {
        getAllUsers: async (date)=>{
            return axiosApi.get(`/api/v1/user?date=${date}`);
        }
    }
}

export default userApi;