import {
    taskType,
    addTaskType,
    updateTaskType,
    deleteTaskType
} from '../action_types';

const initialState = {
    tasks: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case taskType:
            return {
                ...state,
                tasks: action.payload
            }
        case addTaskType:
            return {
                ...state,
                tasks: action.payload
            }
        default:
            return state
    }
}
export default reducer