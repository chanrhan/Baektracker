import Popup from "../../css/popup.module.css"
import {cm} from "../setup/utils/cm";

export const TooltipModal = ({children, top, left, close, modalRef})=>{
    // const componentRef = useRef(null)
    //
    // useEffect(() => {
    //     let timer = null;
    //     if(window.onclick == null){
    //         timer = setTimeout(()=>{
    //             window.onmouseover = e=>{
    //                 if(componentRef.current && !componentRef.current.contains(e.target)){
    //                     close();
    //                 }
    //             }
    //         }, 10);
    //     }
    //     return ()=>{
    //         clearTimeout(timer);
    //         window.onmouseover = null;
    //     }
    // }, []);

    return (
        <div className={cm(Popup.tooltip)} style={{top: top, left: left}} ref={modalRef}>
            {/*<div>*/}
            {/*    <button className='btn btn-outline-danger' onClick={close}>임시 닫기 버튼</button>*/}
            {/*</div>*/}
            {children}
        </div>
    )
}