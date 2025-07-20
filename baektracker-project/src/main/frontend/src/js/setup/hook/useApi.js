import SolvedAcApi from "../../api/SolvedAcApi";

function useApi(){
    return {
        solvedAcApi: SolvedAcApi()
    }
}

export default useApi;