import useModal from "./useModal";
import {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {MutableRefObject} from "react";

export function useRenderlessModal(modalName){
    const modal = useModal();
    const {lock} : Object<string> = useSelector(s=>s.modalReducer)
    const [active, setActive] = useState(false)

    const componentRef: MutableRefObject<HTMLElement> = useRef(null)

    useEffect(() => {
        // console.log(`active: ${active}`)
        if(active){
            modal.openRenderlessModal(modalName, ()=>{}, ()=>{
                // console.log('onclose')
                setActive(false)
            }, {
                ref: componentRef.current
            })
        }
    }, [active]);

    const clickToOpen = (e: MouseEvent)=>{
        if(!active && componentRef.current && !componentRef.current.contains(e.target)){

            open()
        }
    }

    const open = ()=>{
        const keyname = modalName.split('__')[0];
        if(lock && lock.startsWith(keyname)){
            // console.log(`locked: ${keyname}, open: ${lock}`)
           return;
        }
        setActive(true)
    }

    const close = ()=>{
        setActive(false)
        modal.closeModal(modalName)
    }

    const setPos = (top, left)=>{
        const el = componentRef.current;
        // el.style.position = "absolute"
        el.style.top = `${top}px`
        el.style.left = `${left}px`
    }

    return {
        active,
        setActive,
        ref: componentRef,
        clickToOpen,
        open,
        close,
        setPos
    }
}