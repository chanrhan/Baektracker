import {HintModal} from "./tooltip/HintModal";
import AlertModal from "./snackbar/AlertModal";
import {WarningModal} from "./snackbar/WarningModal";
import {InfoModal} from "./snackbar/InfoModal";
import {ConfirmModal} from "./snackbar/ConfirmModal";
import {MoreOptionModal} from "./menu/MoreOptionModal";
import {DateSelectModule} from "./menu/DateSelectModule";
import {SolvedDetailModal} from "./SolvedDetailModal";
import {FineReceiptModal} from "../components/FineReceiptModal";
import {WeekProblemAddModal} from "../components/WeekProblemAddModal";

export const ModalSet = {
    // common
    MoreOption: MoreOptionModal,
    Alert: AlertModal,

    // tooltip
    Hint: HintModal,

    SelectDate: DateSelectModule,
    // error
    Warning: WarningModal,
    Info: InfoModal,

    Confirm: ConfirmModal,
    SolvedDetail: SolvedDetailModal,
    SharedProblemDetail : WeekProblemAddModal,
    Recipe: FineReceiptModal
}