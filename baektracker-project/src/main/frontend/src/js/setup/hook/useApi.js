import SolvedAcApi from "../../api/SolvedAcApi";

function useApi(){
    return {
        problemApi: SolvedAcApi()
    }
}

export default useApi;