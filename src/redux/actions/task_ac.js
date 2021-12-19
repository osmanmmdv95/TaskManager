import {
    taskType,
    addTaskType,
    updateTaskType,
    deleteTaskType
} from '../action_types';

export const setTasks = (data) => ({
    type: taskType,
    payload: data
})

export const setNewTask = (data) => ({
    type: addTaskType,
    payload: data
})