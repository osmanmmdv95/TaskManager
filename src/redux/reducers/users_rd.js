import {
    usersType,
    loginType,
    addUsersType,
    registerUsersType,
    updateUsersType
} from "../action_types";

const initialState = {
    users: [],
    loginUser: null,
    registerUser: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case usersType:
            return { ...state, users: action.payload };
        case loginType:
            return {
                ...state,
                loginUser: action.payload
            };
        case registerUsersType:
            return {
                ...state,
                registerUser: action.payload
            };
        case addUsersType:
            return { ...state, users: action.payload };
        default:
            return state
    }
}

export default reducer