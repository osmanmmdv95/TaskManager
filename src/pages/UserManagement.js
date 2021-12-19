import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ListIcon, GridIcon } from '../components/icons'
import { barListType, gridListType } from '../redux/action_types'
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import Layout from "../components/Container/Layout"
import AntButton from '../components/UIElement/AntButton'
import AntInput from '../components/UIElement/AntInput'
import AntModal from '../components/UIElement/AntModal'
import { roles } from '../config/defaultData'
import { Table, Tag, Card, Avatar, Row, Col } from 'antd';
import { getNewUser, getUsers } from '../redux/actions/users_ac'
import { userRoles } from '../config/contants';
import { getFromLocalStorage, getLastId, setLocalStorage } from '../config/utils';
import AntSelect from '../components/UIElement/AntSelect';
import { EditOutlined, EllipsisOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
const { Meta } = Card

export default function UserManagement() {
    const dispatch = useDispatch();
    const current = useSelector(state => state.current)
    const theme = useSelector(state => state.theme)
    const loader = useSelector(state => state.loader)
    const trans = useSelector(state => state.trans)
    const users = useSelector(state => state.users)
    const [openDialog, setOpenDialog] = useState(false)

    useEffect(() => {
        dispatch(getUsers(getFromLocalStorage("users") && getFromLocalStorage("users")))
    }, [])

    var fields = {
        id: getFromLocalStorage("users") && getLastId(getFromLocalStorage("users")),
        name: '',
        surName: '',
        email: '',
        role: '',
        password: '',
    }
    const [field, setField] = useState(fields)

    var errors = {
        errName: '',
        errSurname: '',
        errEmail: '',
        errRole: '',
        errPassword: ''
    }
    const [error, setError] = useState(errors)

    let validate = () => {
        if (field.name.length < 3) {
            setError({ errName: 'Kayıt çok kısa' });
            return false;
        }
        if (field.name.length > 30) {
            setError({ errName: 'Kayıt çok uzun' });
            return false;
        }
        if (field.surName.length < 3) {
            setError({ errSurname: 'Kayıt çok kısa' });
            return false;
        }
        if (field.surName.length > 30) {
            setError({ errSurname: 'Kayıt çok uzun' });
            return false;
        }
        if (!field.email.includes('@')) {
            setError({ errEmail: 'Geçersiz email' });
            return false;
        }
        if (field.role === "") {
            setError({ errRole: 'Please select user role' });
            return false;
        }
        if (field.password.length < 5) {
            setError({ errPassword: 'Şifre çok kısa' });
            return false;
        }
        return true;
    }

    const showGrid = () => {
        dispatch({ type: gridListType })
    }

    const showBar = () => {
        dispatch({ type: barListType })
    }

    const seacrhItem = (text) => {
        // if (text.length > 2) dispatch(fetchUsers({ ...request, search: text, load: false }, crud.list))
    }

    const searchChangeKeyPress = (text, kcode) => {
        // if (kcode === 8) dispatch(fetchUsers({ ...request, search: text, load: false }, crud.list))
    }

    const register = () => {
        if (validate()) {
            var storeUsers = getFromLocalStorage("users")
            storeUsers.push(field);
            setLocalStorage("users", storeUsers);
            dispatch(getNewUser(storeUsers));

            setOpenDialog(false);
            setField(fields);
        }
    }

    const columns = [
        {
            title: `${trans.name}`,
            dataIndex: 'name',
            key: 'id',
        },
        {
            title: `${trans.surname}`,
            dataIndex: 'surName',
            key: 'id'
        },
        {
            title: `${trans.email}`,
            dataIndex: 'email',
            key: 'id',
        },
        {
            title: `${trans.role}`,
            key: 'id',
            dataIndex: 'role',
            render: role => (
                <Tag color={role === userRoles.admin ? "green" : "blue"}>{role === userRoles.admin ? "Admin" : "User"}</Tag>
            ),
        }
    ];

    const style = { padding: '8px 0' };

    return (
        <Layout>
            <AntModal
                width={375}
                title={trans.newUser}
                visible={openDialog}
                okText={trans.save}
                cancelText={trans.cancel}
                onOk={register}
                onCancel={() => setOpenDialog(false)}>
                <AntInput
                    header={trans.name}
                    value={field.name}
                    placeholder={trans.name}
                    onChange={e => setField({ ...field, name: e.target.value })}
                    message={error.errName} />
                <AntInput
                    header={trans.surname}
                    value={field.surName}
                    placeholder={trans.surname}
                    onChange={e => setField({ ...field, surName: e.target.value })}
                    message={error.errSurname} />
                <AntInput
                    type={'email'}
                    header={trans.email}
                    value={field.email}
                    placeholder={trans.email}
                    onChange={e => setField({ ...field, email: e.target.value })}
                    message={error.errEmail} />
                <AntInput
                    type={'password'}
                    header={trans.password}
                    value={field.password}
                    placeholder={trans.password}
                    onChange={e => setField({ ...field, password: e.target.value })}
                    message={error.errPassword} />
                <AntSelect
                    header={trans.role}
                    value={field.role}
                    options={roles}
                    placeholder={trans.role}
                    onChange={e => setField({ ...field, role: e })}
                    message={error.errRole}
                />
            </AntModal>
            <div className='properties'>
                <div className='left'>
                    <div className='view-button'>
                        <button onClick={showBar}>
                            <ListIcon color={current.bar
                                ? (theme === "dark" ? "rgba(96, 168, 221, 1)" : "rgba(96, 168, 221, 1)")
                                : (theme === "dark" ? "#e5e5e5" : "#5d5d5d")} />
                        </button>
                        <button onClick={showGrid}>
                            <GridIcon color={current.grid
                                ? (theme === "dark" ? "rgba(96, 168, 221, 1)" : "rgba(96, 168, 221, 1)")
                                : (theme === "dark" ? "#e5e5e5" : "#5d5d5d")} />
                        </button>
                    </div>
                </div>
                <div className='right'>
                    <AntInput
                        icon={<SearchOutlined />}
                        placeholder={trans.search}
                        onChange={e => seacrhItem(e.target.value)}
                        onKeyUp={e => searchChangeKeyPress(e.target.value, e.keyCode)}
                    />
                    {users && users.loginUser && users.loginUser.role === userRoles.admin &&
                        <AntButton
                            icons={<PlusOutlined />}
                            content={trans.add}
                            types='primary'
                            onClick={() => setOpenDialog(true)}
                        />
                    }
                </div>
            </div>
            {current.bar && <Table bordered columns={columns} dataSource={users.users} loading={loader.loading} />
            }
            {current.grid &&
                <div className="users-card">
                    {users.users.map(user => {
                        return (
                            <Card
                                className="user-card"
                                cover={
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem' }}>
                                        <Avatar
                                            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                                            icon={<UserOutlined />}
                                        />
                                    </div>
                                }
                            >
                                <Meta
                                    title={user.name + " " + user.surName}
                                    description={
                                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <span style={{ marginBottom: '.5rem' }}>{user.email}</span>
                                            <Tag color={user.role === userRoles.admin ? 'green' : 'blue'}>{user.role === userRoles.admin ? "Admin" : "User"}</Tag>
                                        </div>
                                    }
                                />
                            </Card>
                        )
                    })}
                </div>
            }
        </Layout>
    )
}