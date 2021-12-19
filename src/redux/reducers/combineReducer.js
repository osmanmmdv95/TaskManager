import { combineReducers } from "redux";
import current_rd from './current_rd';
import theme_rd from "./theme_rd";
import loader_rd from "./loader_rd";
import result_rd from "./result_rd";
import trans_rd from "./trans_rd";
import users_rd from "./users_rd"
import task_rd from "./task_rd"

export default combineReducers({
    current: current_rd,
    theme: theme_rd,
    loader: loader_rd,
    result: result_rd,
    trans: trans_rd,
    users: users_rd,
    tasks: task_rd
})
