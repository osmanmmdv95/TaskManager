import {
    usersType,
    loginType,
    addUsersType,
    registerUsersType,
    updateUsersType
} from '../action_types';
import { users } from '../../config/defaultData'
import { message } from 'antd'
import { getFromLocalStorage, setLocalStorage } from '../../config/utils';

export const getUsers = (data) => ({
    type: usersType,
    payload: data
})

export const getNewUser = (data) => ({
    type: addUsersType,
    payload: data
})

export const setLoginUser = (data) => ({
    type: loginType,
    payload: data
})

export const login = (data) => dispacth => {
    if (users.find(x => x.email === data.email && x.password === data.password)) {
        var user = users.filter(x => x.email === data.email && x.password === data.password);
        setLocalStorage("signin", user[0]);
        dispacth(setLoginUser(user[0]));
        window.location.href = "/";
    }
    else {
        message.error("No user found matching the information you entered.")
    }
}

export const register = (data) => dispacth => {
    if (getFromLocalStorage("signup")) {
        var storeSignUp = getFromLocalStorage("signup");
        storeSignUp.push(data);
        setLocalStorage("signup", storeSignUp);
        setLocalStorage("signin", data);
    }
    else {
        setLocalStorage("signup", [data]);
        setLocalStorage("signin", data);
    }
    dispacth(setLoginUser(data));
    window.location.href = "/";
}