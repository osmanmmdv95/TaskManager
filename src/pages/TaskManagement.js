import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { taskStatus } from '../config/contants'
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import Layout from "../components/Container/Layout"
import AntButton from '../components/UIElement/AntButton'
import AntInput from '../components/UIElement/AntInput'
import AntModal from '../components/UIElement/AntModal'
import AntDatePicker from '../components/UIElement/AntDatePicker'
import { setNewTask, setTasks } from '../redux/actions/task_ac'
import { users as fakeUsers, status, statusFilters, usersFilter } from '../config/defaultData'
import { Table, Tag, Space, Tooltip, Avatar as AntAvatar } from 'antd';
import { getFromLocalStorage, getInitials, getLastId, setLocalStorage } from '../config/utils'
import AntSelect from '../components/UIElement/AntSelect'

export default function TaskManagement() {
    const dispatch = useDispatch();
    const loader = useSelector(state => state.loader)
    const trans = useSelector(state => state.trans)
    const tasks = useSelector(state => state.tasks)
    const [openDialog, setOpenDialog] = useState(false)

    useEffect(() => {
        dispatch(setTasks(getFromLocalStorage("tasks") && getFromLocalStorage("tasks")))
    }, [])

    var fields = {
        id: getFromLocalStorage("tasks") && getLastId(getFromLocalStorage("tasks")),
        title: '',
        description: '',
        deadLine: new Date(),
        taskUsers: []
    }
    const [field, setField] = useState(fields)

    var errors = {
        errTitle: '',
        errDescription: '',
        errDeadLine: '',
        errTaskUsers: ''
    }
    const [error, setError] = useState(errors)

    let validate = () => {
        if (field.title.length < 3) {
            setError({ errTitle: 'Kayıt çok kısa' });
            return false;
        }
        if (field.description.length < 3) {
            setError({ errDescription: 'Kayıt çok kısa' });
            return false;
        }
        if (field.deadLine === "") {
            setError({ errDeadLine: 'Son tarih seçiniz' });
            return false;
        }
        if (field.taskUsers.length === 0) {
            setError({ errTaskUsers: 'En az bir görevli seçmeniz gerekiyor' });
            return false;
        }
        return true;
    }

    const seacrhItem = (text) => {
        // if (text.length > 2) dispatch(fetchUsers({ ...request, search: text, load: false }, crud.list))
    }

    const searchChangeKeyPress = (text, kcode) => {
        // if (kcode === 8) dispatch(fetchUsers({ ...request, search: text, load: false }, crud.list))
    }

    const register = () => {
        if (validate()) {
            var storeTasks = getFromLocalStorage("tasks")
            storeTasks.push(field);
            setLocalStorage("tasks", storeTasks);
            dispatch(setNewTask(storeTasks));
            setOpenDialog(false);
            setField(fields);
        }
    }

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

    const getFakeUsers = () => {
        var option = [];
        var storeUsers = getFromLocalStorage("users") ? getFromLocalStorage("users") : fakeUsers
        storeUsers.map((user) => {
            option.push({
                label: user.name + " " + user.surName,
                value: user.id
            })
        })
        return option;
    }

    const getFilterUsers = () => {
        var storeUsers = getFromLocalStorage("users") && getFromLocalStorage("users")
        var option = [];
        if (storeUsers) {
            storeUsers.map(user => {
                option.push({
                    text: user.name + " " + user.surName,
                    value: user.id
                })
            })
            return option;
        }
        return usersFilter;
    }

    const getSelectUsers = (ids) => {
        var users = [];
        var storeUsers = getFromLocalStorage("users")
        ids.map(i => {
            users.push(storeUsers.find(x => x.id === i));
        })
        return users;
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
            filters: [...getFilterUsers()],
            onFilter: (value, record) => (record.taskUsers.find(x => x.id === value)),
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
            <AntModal
                width={500}
                title={trans.newUser}
                visible={openDialog}
                okText={trans.save}
                cancelText={trans.cancel}
                onOk={register}
                onCancel={() => setOpenDialog(false)}>
                <AntInput
                    header={trans.title}
                    value={field.title}
                    placeholder={trans.title}
                    onChange={e => setField({ ...field, title: e.target.value })}
                    message={error.errTitle} />
                <AntInput
                    textArea
                    rows={4}
                    maxLen={200}
                    showCount={true}
                    header={trans.description}
                    value={field.description}
                    placeholder={trans.description}
                    onChange={e => setField({ ...field, description: e.target.value })}
                    message={error.errDescription} />
                <AntDatePicker
                    showTime={true}
                    header={trans.deadLine}
                    defaultValue={field.deadLine}
                    dateFormat='DD-MM-YYYY HH:mm'
                    onChange={(date, dateString) => setField({ ...field, deadLine: dateString })}
                    message={error.errDeadLine} />
                <AntSelect
                    header={trans.status}
                    value={field.status}
                    options={status}
                    placeholder={trans.status}
                    onChange={e => setField({ ...field, status: e })}
                    message={error.errStatus} />
                <AntSelect
                    mode={"multiple"}
                    header={trans.users}
                    value={field.users}
                    options={getFakeUsers()}
                    placeholder={trans.users}
                    onChange={e => setField({ ...field, taskUsers: getSelectUsers(e) })}
                    message={error.errUsers} />
            </AntModal>
            <div className='properties'>
                <div className='left'></div>
                <div className='right'>
                    <AntInput
                        icon={<SearchOutlined />}
                        placeholder={trans.search}
                        onChange={e => seacrhItem(e.target.value)}
                        onKeyUp={e => searchChangeKeyPress(e.target.value, e.keyCode)} />
                    <AntButton
                        icons={<PlusOutlined />}
                        content={trans.add}
                        types='primary'
                        onClick={() => setOpenDialog(true)} />
                </div>
            </div>
            <Table bordered columns={columns} dataSource={tasks.tasks} loading={loader.loading} />
        </Layout>
    )
}
