import {useEffect, useMemo, useState} from "react";
import {cm, cmc} from "../../../utils/cm";
import User from "../../../../css/user.module.css";
import {ObjectUtils} from "../../../utils/objectUtil";
import {MenuModal} from "../MenuModal";

/**
 *
 * @param props
 * @returns {JSX.Element|null}
 * @constructor
 * @deprecated
 */
export function SelectModal(props){
    // useMemo(() => {
    //     if(ObjectUtils.isEmpty(props.inputField.getInput(props.name))){
    //         props.inputField.put(props.name, props.initValue ?? 0);
    //     }
    // });

    // useEffect(() => {
    //     if(typeof inputField !== 'object' && values && name){
    //         inputField.put(name, values[selected]);
    //         onChange(values[selected]);
    //     }
    // }, [selected]);

    const select = i=>{
        props.inputField.put(props.name, i);
    }

    // console.table(props)
    console.log(props.theme)
    // console.table(props.theme)


    if(typeof props.inputField !== 'object' || ObjectUtils.isEmpty(props.values)){
        return null;
    }

    return (
        <MenuModal {...props}>
            {/*<button type="button" className={`${cmc(User.select_btn)} ${className}`} onClick={open}>{values[selected]}</button>*/}
            <ul className={`select_layer active ${props.theme && cm(props.theme['select_layer'], props.theme['active'])} `}>
                {
                    props.values && props.values.map((v,i)=> {
                        return <li key={i} className={`select_item ${props.theme && props.theme['select_item']}`}>
                            <button type="button" onClick={()=>{
                                select(i)
                            }} className={`select_btn ${props.theme && cm(props.theme['select_btn'], props.theme['button'])}`}>{v}</button>
                        </li>
                    })
                }
            </ul>
        </MenuModal>
    )
}