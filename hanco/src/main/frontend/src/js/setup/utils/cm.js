
// css module
export const cm = (...classNames)=>{
    return classNames.join(" ");
}

// css module + common
export const cmc = (...classNames)=>{
    let result = classNames.join(" ");
    const arr = [];
    // console.log("dsada")
    for(let s of classNames){
        // console.log(`className: ${s}`)
        let idx1 = s.indexOf("_");
        let idx2 = s.indexOf("__");
        // console.log(`${idx1} ${idx2}`)
        if(idx1 !== -1 && idx2 !== -1){
            // console.log(`sub: ${s.substring(idx1+1, idx2)}`)
            arr.push(s.substring(idx1+1, idx2));
        }
    }
    if(arr.length > 0){
        // console.log(`arr join: ${arr.join(" ")}`)
        result += " " +  arr.join(" ");
    }
    return result;
}

export const toCssModules = (...cssModules)=>{
    if(!cssModules){
        return null;
    }

    return [...cssModules];
}