import {SnackbarModal} from "../SnackbarModal";
import Modal from "../../../css/modal.module.css"
import useModal from "../../setup/hook/useModal";
import {ModalType} from "../../setup/modal/ModalType";

function AlertModal(props){
    const modal = useModal();

    const close = ()=>{
        modal.closeModal(ModalType.SNACKBAR.Alert)
    }

    return (
        <SnackbarModal close={close} timeout='3000' className={Modal.alert} {...props}>
            {props.msg}
        </SnackbarModal>
    )
}

export default AlertModal;