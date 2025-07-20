import {createSlice} from "@reduxjs/toolkit";

export const ACCESS_TOKEN_TIMEOUT = 1000 * 60 * 10; // 10분

const initialState = {
        authenticated: false,
        accessToken: null,
        expireTime: null
    };

export const authSlice = createSlice({
    name: 'authToken',
    initialState: initialState,
    reducers:{
        setAccessToken(state, action){
            // console.log(">>>>>>>>>>>>>> setAccessToken");
            // console.log(action);

            state.authenticated = true;
            state.accessToken = action.payload;
            state.expireTime = new Date().getTime() + ACCESS_TOKEN_TIMEOUT;
            return state;
            // console.log(`state.accessToken: ${state.accessToken}`)
        },
        delAccessToken(state){
            state.authenticated = false;
            state.accessToken = null;
            state.expireTime = null
        },
        clear: (state)=>{
            state = initialState
        },
        getAccessToken: (state)=>{

        }
    }
})

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;