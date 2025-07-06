import {SnackbarModal} from "../SnackbarModal";
import useModal from "../../setup/hook/useModal";
import {ModalType} from "../../setup/modal/ModalType";
import Modal from "../../../css/modal.module.css"

export function InfoModal(props){
    const modal = useModal();

    const close = ()=>{
        modal.closeModal(ModalType.SNACKBAR.Info)
    }

    return (
        <SnackbarModal close={close} timeout={3000} className={Modal.info} {...props}>
            {props.msg}
        </SnackbarModal>
    )
}