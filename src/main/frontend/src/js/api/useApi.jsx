import problemApi from "./problemApi";
import userApi from "./userApi";
import weeklyResultApi from "./weeklyResultApi";

export function useApi(){
    return {
        problemApi: problemApi(),
        userApi: userApi(),
        weeklyResultApi: weeklyResultApi()
    }
}