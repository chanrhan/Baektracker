import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    lock: null,
    list: []
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action)=>{
            const {modalName, type, onopen, onclose, props} = action.payload;
            // console.log('open')
            if(state.list.some(value=>(modalName === value.modalName))){
                return state;
            }
            const arr = [...state.list.concat({modalName, type, onopen, onclose, props})];
            if(onopen){
                onopen();
            }
            return {
                lock: state.lock,
                list: arr
            }
        },
        closeModal: (state, action)=>{
            const modalName = action.payload;
            // console.log('close')
            const target = state.list.filter(v=>v.modalName === modalName).at(0);
            if(target && target.onclose){
                target.onclose();
            }
            const deleted = [...state.list.filter(value=>(value.modalName !== modalName))]
            return {
                lock: state.lock,
                list: deleted
            }
        },
        closeAndLock: (state, action)=>{
            const modalName = action.payload;
            // console.log('close and lock')
            // console.log(`close and lock: ${action.payload}`)
            const target = state.list.filter(v=>v.modalName === modalName).at(0);
            if(target && target.onclose){
                target.onclose();
            }
            const deleted = [...state.list.filter(value=>(value.modalName !== modalName))]
            return {
                lock: modalName,
                list: deleted
            }
        },
        lock: (state, action)=>{
            // console.log(`lock: ${action.payload}`)
            return {
                lock: action.payload,
                list: [...state.list]
            }
        },
        unlock: (state)=>{
            // console.log('unlock')
            return {
                lock: null,
                list: [...state.list]
            }
        },
        getStackSize: (state)=>{
            return state.list && state.list.length > 0
        }
    }
});

export const modalReducer = modalSlice.reducer;
export const {openModal, closeModal, getStackSize, lock, unlock, closeAndLock} = modalSlice.actions;