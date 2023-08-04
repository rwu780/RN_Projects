import { ActionTypes, userProfile } from "../../types/types";
import AUTH from "./authActions";

export interface authState { 
    loading: boolean;
    userData: userProfile | null;
    error: any;
}

const initialState: authState = {
    loading: false,
    userData: null,
    error: null
}

export default function (state: authState = initialState, action: ActionTypes): authState {
    switch(action.type) {
        case AUTH.REGISTER_USER_IN_PROGRESS:
            return {
                ...state,
                loading: true,
                userData: null,
                error: null
            }
        case AUTH.REGISTER_USER_SUCCESS:
            return {
                ...state,
                userData: action.payload,
                loading: false
            }
        case AUTH.REGISTER_USER_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
                userData: null
            }
        default:
            return state;
    }
}