import {combineReducers} from "@reduxjs/toolkit";
import {authReducer} from "./authSlice";
import {modalReducer} from "./modalSlice";

const rootReducer = combineReducers({
    authReducer,
    modalReducer,
});

export default rootReducer;