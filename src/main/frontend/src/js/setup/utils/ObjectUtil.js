
export const ObjectUtils = {
    isEmpty: (value)=>{
        const result = value === null || value === undefined || value === '' || value.length === 0;
        if(result){
            return true;
        }
        if(typeof value === 'object'){
            return  Object.keys(value).length === 0;
        }
        return false;
    },
    isEmptyArray: (array)=>{
        return !array || typeof array !== "object" || array.length === 0
    },
    isEmptyMap(map){
        for(const key in map){
            if(!ObjectUtils.isEmpty(map[key])){
                return false;
            }
        }
        return true;
    },
    convertBooleanArrayToString(arr){
        let str = '';
        arr.map((value)=>{
            str += (value) ? '1' : '0';
        })
        return str;
    },
    transposeArray: (arr) => arr.reduce(
        (result, row) => row.map((_, i) => [...(result[i] || []), row[i]]),
        []
    ),
    toggleOf,
    varToString,
}

function toggleOf(arr, index){
    for(let i in arr){
        arr[i] = (i == index);
    }
}

function varToString(_var){
    return Object.keys(_var)[0];
}