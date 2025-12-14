import {AxiosApi} from "../setup/api/ApiCommon";

function userApi(){
    const axiosApi = AxiosApi();
    return {
        getAllUsers: async (date)=> {
            return axiosApi.get(`/api/v1/user?date=${date}`);
        },
        grantPassThisWeek: async (id, state, pwd)=> {
            return axiosApi.post(`/api/v1/user/week-pass`, {
                id: id,
                password: pwd,
                activate: state === 1
            });
        },
        updatePassword: async (id, orgPwd, newPwd)=> {
            return axiosApi.patch(`/api/v1/user/pwd`, {id, orgPwd, newPwd});
        },
    }
}

export default userApi;
