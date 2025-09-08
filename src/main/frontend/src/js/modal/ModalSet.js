import {HintModal} from "./tooltip/HintModal";
import AlertModal from "./snackbar/AlertModal";
import {WarningModal} from "./snackbar/WarningModal";
import {InfoModal} from "./snackbar/InfoModal";
import {ConfirmModal} from "./snackbar/ConfirmModal";
import {MoreOptionModal} from "./menu/MoreOptionModal";
import {DateSelectModule} from "./menu/DateSelectModule";
import {FineReceiptModal} from "./FineReceiptModal";
import {WeekProblemAddModal} from "./WeekProblemAddModal";
import {GrantPassMenuModal} from "./menu/GrantPassMenuModal";

export const ModalSet = {
    // common
    MoreOption: MoreOptionModal,
    Alert: AlertModal,

    // tooltip
    Hint: HintModal,

    // Menu
    SelectDate: DateSelectModule,
    GrantPass : GrantPassMenuModal,

    // error
    Warning: WarningModal,
    Info: InfoModal,

    Confirm: ConfirmModal,
    WeeklyProblemDetail : WeekProblemAddModal,
    Recipe: FineReceiptModal
}