import {ObjectUtils} from "./ObjectUtil";

export const NumberUtils = {
    toPrice: (value: number)=>{
        if(ObjectUtils.isEmpty(value)){
            return '0';
        }
        return value.toLocaleString();
    },
    sum: (arr: [])=>{
        let rst = 0;
        arr.forEach(v=>{
            rst += v;
        })
        return rst;
    },
    toNumber: (value)=>{
        const num = Number(value);
        if(Number.isNaN(num)){
            return 0;
        }
        return num;
    }

}

