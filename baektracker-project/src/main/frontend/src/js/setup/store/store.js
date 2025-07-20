import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "./slices/rootReducer";

const initState = {};

const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    preloadedState: initState,
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware({
        serializableCheck: false
    })
});

export default store;