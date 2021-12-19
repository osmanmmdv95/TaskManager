import { taskStatus, userRoles } from "./contants";

export const users = [
    {
        id: 1,
        name: "Osman",
        surName: "Mamedov",
        email: "osmanmuhammedoglu@gmail.com",
        role: userRoles.admin,
        password: "156901032"
    },
    {
        id: 2,
        name: "James",
        surName: "Bond",
        email: "jamesbond@gmail.com",
        role: userRoles.user,
        password: "156901032"
    },
    {
        id: 3,
        name: "John",
        surName: "Brown",
        email: "johnbrown@gmail.com",
        role: userRoles.user,
        password: "156901032"
    },
    {
        id: 4,
        name: "Jim",
        surName: "Green",
        email: "jimgreen@gmail.com",
        role: userRoles.user,
        password: "156901032"
    },
    {
        id: 5,
        name: "Joe",
        surName: "Black",
        email: "joeblack@gmail.com",
        role: userRoles.user,
        password: "156901032"
    },
    {
        id: 6,
        name: "Edward",
        surName: "Kink",
        email: "edwardking@gmail.com",
        role: userRoles.user,
        password: "156901032"
    }
]

export const tasks = [
    {
        id: 1,
        title: "Web Design",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        deadLine: "15-12-2021 15:00",
        status: taskStatus.continues,
        taskUsers: [users[0], users[2], users[5]]
    },
    {
        id: 2,
        title: "Web Design",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        deadLine: "15-12-2021 15:00",
        status: taskStatus.todo,
        taskUsers: [users[1], users[2], users[3]]
    },
    {
        id: 3,
        title: "Web Design",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        deadLine: "15-12-2021 15:00",
        status: taskStatus.completed,
        taskUsers: [users[3], users[4], users[5]]
    },
    {
        id: 4,
        title: "Web Design",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        deadLine: "15-12-2021 15:00",
        status: taskStatus.cancelled,
        taskUsers: [users[0], users[1], users[2]]
    },
    {
        id: 5,
        title: "Web Design",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        deadLine: "15-12-2021 15:00",
        status: taskStatus.cancelled,
        taskUsers: [users[0], users[4], users[5]]
    },
    {
        id: 6,
        title: "Web Design",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        deadLine: "15-12-2021 15:00",
        status: taskStatus.completed,
        taskUsers: [users[1], users[3], users[5]]
    },
    {
        id: 7,
        title: "Web Design",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        deadLine: "15-12-2021 15:00",
        status: taskStatus.todo,
        taskUsers: [users[0], users[1], users[5]]
    },
    {
        id: 8,
        title: "Web Design",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        deadLine: "15-12-2021 15:00",
        status: taskStatus.continues,
        taskUsers: [users[0], users[2], users[4]]
    }
]

export const status = [
    {
        label: "ToDo",
        value: 1
    },
    {
        label: "Continues",
        value: 2
    },
    {
        label: "Completed",
        value: 3
    },
    {
        label: "Cancelled",
        value: 4
    },
]

export const statusFilters = [
    {
        text: "ToDo",
        value: 1
    },
    {
        text: "Continues",
        value: 2
    },
    {
        text: "Completed",
        value: 3
    },
    {
        text: "Cancelled",
        value: 4
    },
]

export const usersFilter = [
    {
        value: 1,
        text: "Osman Mamedov",
    },
    {
        value: 2,
        text: "James Bond",
    },
    {
        value: 3,
        text: "John Brown",
    },
    {
        value: 4,
        text: "Jim Green"
    },
    {
        value: 5,
        text: "Joe Black"
    },
    {
        value: 6,
        text: "Edward Kink",
    }
]

export const roles = [
    { value: 1, label: "Admin" },
    { value: 2, label: "User" }
]