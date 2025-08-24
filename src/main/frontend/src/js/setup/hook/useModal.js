import {useDispatch, useSelector} from "react-redux";
import {closeModal, getStackSize, openModal, lock, unlock, closeAndLock} from "../store/slices/modalSlice";
import {ModalType} from "../modal/ModalType";

function useModal(){
    const dispatch = useDispatch();

    const handleOpenModal = (modalName, props)=>{
        const type = ModalType.getType(modalName);
        dispatch(openModal({modalName, type, props}));
    }

    const handleCloseModal = (modalName)=>{
        dispatch(closeModal(modalName));
    }

    const handleOpenRenderlessModal = (modalName, onopen, onclose, props)=>{
        dispatch(openModal({modalName, type: 'RENDERLESS', onopen, onclose, props}));
    }

    const hasModal = ()=>{
        return getStackSize();
    }

    const lockModal = (modalName)=>{
        dispatch(lock(modalName))
    }
    const unlockModal = ()=>{
        dispatch(unlock())
    }
    const closeAndLockModal = (modalName)=>{
        dispatch(closeAndLock(modalName))
    }

    return {
        openModal: handleOpenModal,
        closeModal: handleCloseModal,
        openRenderlessModal: handleOpenRenderlessModal,
        hasModal,
        lockModal,
        unlockModal,
        closeAndLockModal
    }
}

export default useModal;