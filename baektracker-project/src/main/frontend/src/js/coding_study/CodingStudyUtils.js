import Study from "../../css/study.module.css";

export const CodingStudyUtils = {
    getTierColor : (lv)=>{
        if(lv <= 0){ // unrated
            return '#c1ea84';
        }else if(lv <= 5){ // bronze
            return '#b6897f';
        }else if(lv > 5 && lv <= 10){ // silver
            return '#e5e5e5';
        }else if(lv > 10 && lv <= 15){ // gold
            return '#ffd634';
        }else if(lv > 15 && lv <= 20){ // platinum
            return '#89ffd2';
        }else if(lv > 20 && lv <= 25){ // diamond
            return '#548dff';
        }else if(lv > 25 && lv <= 30){ // ruby
            return '#ff5f5f';
        }else{
            return 'white'
        }
    },
    getTierIconClass : (lv)=>{
        let tier;
        let num;
        if(lv <= 0){ // unrated
            return Study.unrated
        }else if(lv <= 5){ // bronze
            tier = 'bronze'
            num = 6 - lv;
        }else if(lv > 5 && lv <= 10){ // silver
            tier = 'silver'
            num = 11 - lv;
        }else if(lv > 10 && lv <= 15){ // gold
            tier = 'gold'
            num = 16 - lv;
        }else if(lv > 15 && lv <= 20){ // platinum
            tier = 'platinum'
            num = 21 - lv;
        }else if(lv > 20 && lv <= 25){ // diamond
            tier = 'diamond'
            num = 26 - lv;
        }else if(lv > 25 && lv <= 30){ // ruby
            tier = 'ruby'
            num = 31 - lv;
        }
        const classname = `${tier}_${num}`;
        return Study[classname];
    },
    getBarColor : (per)=>{
        if(per === 0){
            return '#ffffff'
        }else if(per <= 10){
            return '#ff0000'
        }else if(per > 10 && per <= 50){
            return '#ffaa54'
        }else if(per > 50 && per < 100){
            return '#ffd754'
        }else if(per >= 100){
            return '#2986ff'
        }else{
            return '#ffffff'
        }
    },
    getResultColor : (result)=>{
        if(result === 4){
            return '#09d000'
        }else{
            return '#ff4a4a'
        }
    },
    getLevelIconClass : (lv)=>{
        let tier;
        let num;
        if(lv <= 0){ // unrated
            tier = 'sprout'
            num = 6 - (-lv);
        }else if(lv <= 5){ // bronze
            tier = 'bronze'
            num = 6 - lv;
        }else if(lv > 5 && lv <= 10){ // silver
            tier = 'silver'
            num = 11 - lv;
        }else if(lv > 10 && lv <= 15){ // gold
            tier = 'gold'
            num = 16 - lv;
        }else if(lv > 15 && lv <= 20){ // platinum
            tier = 'platinum'
            num = 21 - lv;
        }else if(lv > 20 && lv <= 25){ // diamond
            tier = 'diamond'
            num = 26 - lv;
        }else if(lv > 25 && lv <= 30){ // ruby
            tier = 'ruby'
            num = 31 - lv;
        }
        const classname = `${tier}_${num}`;
        return Study[classname];
    }
}