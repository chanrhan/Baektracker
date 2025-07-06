import {SnackbarModal} from "../SnackbarModal";
import useModal from "../../setup/hook/useModal";
import {ModalType} from "../../setup/modal/ModalType";
import Modal from "../../../css/modal.module.css"

export function WarningModal(props){
    const modal = useModal();

    const close = ()=>{
        modal.closeModal(ModalType.SNACKBAR.Warn)
    }

    return (
        <SnackbarModal close={close} timeout={3000} className={Modal.warning} {...props}>
            {props.msg}
        </SnackbarModal>
    )
}