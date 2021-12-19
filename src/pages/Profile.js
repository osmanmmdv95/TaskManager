import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from "../components/Container/Layout"
import { Table, Tag, Space, Tooltip, Avatar as AntAvatar } from 'antd';
import { getFromLocalStorage, getInitials, removeFromLocalStorage } from '../config/utils';
import { taskStatus } from '../config/contants';
import { statusFilters } from '../config/defaultData';
import AntButton from '../components/UIElement/AntButton';
import { useHistory } from 'react-router-dom';
import { setLoginUser } from '../redux/actions/users_ac';

export default function Profile() {
    const dispatch = useDispatch()
    const users = useSelector(state => state.users)
    const trans = useSelector(state => state.trans)
    const tasks = useSelector(state => state.tasks)
    const loader = useSelector(state => state.loader)
    const history = useHistory();

    useEffect(() => {
        if (getFromLocalStorage("signin"))
            dispatch(setLoginUser(getFromLocalStorage("signin")))
    }, [])

    const getTaskStatus = (status) => {
        switch (status) {
            case taskStatus.todo:
                return (<Tag color={'lime'}>To Do</Tag>);
            case taskStatus.continues:
                return (<Tag color={'blue'}>Continues</Tag>);
            case taskStatus.completed:
                return (<Tag color={'green'}>Complated</Tag>);
            case taskStatus.cancelled:
                return (<Tag color={'red'}>Cancelled</Tag>);
            default:
                break;
        }
    }

    const getFilterUserTask = () => {
        var filteredTask = [];
        tasks && tasks.tasks && tasks.tasks.map(task => {
            if (task.taskUsers.find(x => x.id === users.loginUser && users.loginUser.id))
                filteredTask.push(task)
        })
        return filteredTask
    }

    const LogOut = () => {
        removeFromLocalStorage("signin");
        history.push("/login")
    }

    const columns = [
        {
            title: `${trans.title}`,
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: `${trans.description}`,
            dataIndex: 'description',
            ellipsis: {
                showTitle: true,
            },
            key: 'description',
            render: description => (
                <Tooltip placement="topLeft" title={description}>
                    {description}
                </Tooltip>
            ),
        },
        {
            title: `${trans.deadline}`,
            dataIndex: 'deadLine',
            key: 'deadLineid',
        },
        {
            title: `${trans.status}`,
            key: 'status',
            dataIndex: 'status',
            render: status => (
                getTaskStatus(status)
            ),
            filters: [...statusFilters],
            onFilter: (value, record) => (record.status === value),
        },
        {
            title: `${trans.users}`,
            key: 'users',
            render: (text, record) => (
                <Space size="middle">
                    <AntAvatar.Group maxCount={2} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
                        {record && record.taskUsers && record.taskUsers.length > 0 && record.taskUsers.map(x => {
                            return (<AntAvatar title={x.name + " " + x.surName}>{getInitials(x.name + " " + x.surName)}</AntAvatar>)
                        })}
                    </AntAvatar.Group>
                </Space>
            ),
        },
    ];

    return (
        <Layout>
            <div className="profile-container">
                <div className="user-info">
                    <div className="info-item">
                        <span className="title">Organization Name</span>
                        <span className="info">{users && users.loginUser && users.loginUser.organizationName}</span>
                    </div>
                    <div className="info-item">
                        <span className="title">Address</span>
                        <span className="info">{users && users.loginUser && users.loginUser.address}</span>
                    </div>
                    <div className="info-item">
                        <span className="title">Email</span>
                        <span className="info">{users && users.loginUser && users.loginUser.email}</span>
                    </div>
                    <div className="info-item">
                        <span className="title">User Name</span>
                        <span className="info">{users && users.loginUser && users.loginUser.userName}</span>
                    </div>
                    <div className="info-item">
                        <span className="title">Phone Number</span>
                        <span className="info">{users && users.loginUser && users.loginUser.phoneNumber}</span>
                    </div>
                    <div className="info-item">
                        <span className="title">Password</span>
                        <span className="info">{users && users.loginUser && users.loginUser.password}</span>
                    </div>
                    {users && users.loginUser !== null ?
                        <AntButton types={"danger"} onClick={LogOut} content={"Log Out"} /> :
                        <AntButton types={"primary"} onClick={() => history.push("/login")} content={"Login"} />}
                </div>
                {/* <div className="task-list">
                    <div className="task-list-title">My Task List</div>
                    <Table bordered columns={columns} dataSource={getFilterUserTask()} loading={loader.loading} />
                </div> */}
            </div>
        </Layout>
    )
}
