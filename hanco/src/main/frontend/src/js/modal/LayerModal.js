import Popup from "../../../css/popup.module.css"
import {cm, cmc} from "../../utils/cm";
import {useEffect, useRef, useState} from "react";
import {ScrollUtils} from "../../utils/ScrollUtils";

export const LayerModal = ({modalRef, scrollable, children, top, left, width,
                               height, windowBlocked, minWidth, maxWidth, minHeight, maxHeight, paddingBottom}) => {
    const [fadeIn, setFadeIn] = useState(false);

    const scrollRef = useRef(null)

    useEffect(() => {
        let prevScrollY = null;
        if(!scrollable){
            prevScrollY = ScrollUtils.preventScroll(scrollRef.current.body);
        }
        const timer = setTimeout(() => {
            setFadeIn(true)
        }, 100)

        return () => {
            if(prevScrollY){
                ScrollUtils.allowScroll(scrollRef.current.body, prevScrollY)
            }
            prevScrollY = null;
            clearTimeout(timer);
        }
    }, []);


    useEffect(() => {
        let prevScrollY = null;
        if(windowBlocked){
            prevScrollY = ScrollUtils.preventScroll(document.body);
        }
        return ()=>{
            ScrollUtils.allowScroll(document.body, prevScrollY)
        }
    }, []);

    // const clickAwayToClose = (e)=>{
    //     if(contentRef.current && !contentRef.current.contains(e.target)){
    //         close();
    //     }
    // }


    return (
        <>
            <div className={`scroll-hidden ${cm(Popup.popup_mask, `${fadeIn && Popup.active}`)}`} ref={scrollRef}>
                <div className={Popup.popup} ref={modalRef} style={
                    {
                        top: `${60 + top}px`,
                        left: `${left}px`,
                        width: `${width}px`,
                        height: `${height}px`,
                        minWidth: `${minWidth}px`,
                        maxWidth: `${maxWidth}px`,
                        minHeight: `${minHeight}px`,
                        maxHeight: `${maxHeight}px`,
                        paddingBottom: `${paddingBottom}px`
                    }
                }>
                    {children}
                </div>
            </div>
        </>

    )
}
