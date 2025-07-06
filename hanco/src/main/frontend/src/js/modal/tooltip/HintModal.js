import {TooltipModal} from "../TooltipModal";

export function HintModal(props){
    return (
        <TooltipModal modalRef={props.modalRef}>
            <div>
                {props.msg}
            </div>
        </TooltipModal>
    )
}