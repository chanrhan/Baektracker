import {AxiosApi} from "../setup/api/ApiCommon";

function userApi() {
    const axiosApi = AxiosApi();
    return {
        getUsers: async () => {
            return axiosApi.get(`/api/v1/user`);
        },
        updatePassword: async (id, orgPwd, newPwd) => {
            return axiosApi.patch(`/api/v1/user/pwd`, {id, orgPwd, newPwd});
        },
    }
}

export default userApi;
