import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AntButton from '../components/UIElement/AntButton'
import AntInput from '../components/UIElement/AntInput'
import { getFromLocalStorage, isNumber, getLastId } from '../config/utils';
import { register } from '../redux/actions/users_ac';

function RegisterPage() {
    const history = useHistory();
    const dispatch = useDispatch()
    const trans = useSelector(state => state.trans)
    const [value, setValue] = useState()
    var fields = {
        id: getFromLocalStorage("signup") ? getLastId(getFromLocalStorage("signup")) : 1,
        organizationName: '',
        phoneNumber: '',
        address: '',
        userName: '',
        email: '',
        password: ''
    };
    var errors = {
        errOrganizationName: '',
        errPhoneNumber: '',
        errAddress: '',
        errUserName: '',
        errEmail: '',
        errPassword: ''
    };
    const [field, setField] = useState(fields)
    const [error, setError] = useState(errors)

    const Register = () => {
        if (validation()) {
            dispatch(register(field))
        }
    }

    const validation = () => {
        if (field.organizationName === "") {
            setError({ errOrganizationName: "Please enter your organization name" })
            return false;
        }
        if (field.address === "") {
            setError({ errAddress: "Please enter your address" })
            return false;
        }
        if (field.userName === "") {
            setError({ errUserName: "Please enter your username" })
            return false;
        }
        if (field.phoneNumber === "") {
            setError({ errPhoneNumber: "Please enter your phone number" })
            return false;
        }
        if (field.email === "") {
            setError({ errEmail: "Please enter your email address" })
            return false;
        }
        if (!field.email.includes("@")) {
            setError({ errEmail: "Please enter a valid e-mail address" })
            return false;
        }
        if (field.password === "") {
            setError({ errEmail: "Please enter your password" })
            return false;
        }
        if (field.password.length < 6) {
            setError({ errEmail: "Your password must be at least 6 characters" })
            return false;
        }
        if (field.password.search(/[^a-zA-Z]+/) > 0) {
            setError({ errEmail: "Your password must be alphanumeric numbers" })
            return false
        }
        return true;
    }

    return (
        <div className="main">
            <div className="login-container">
                <div className="login-box">
                    <div className="login-page-title">
                        Task Manager Register
                    </div>
                    <AntInput
                        sizes={"large"}
                        value={field.organizationName}
                        header={trans.organizationName}
                        placeholder={trans.organizationName}
                        onChange={e => setField({ ...field, organizationName: e.target.value })}
                        message={error.errOrganizationName}
                    />
                    <AntInput
                        sizes={"large"}
                        value={field.phoneNumber}
                        maxLen={13}
                        header={trans.phone}
                        placeholder={trans.phone}
                        onChange={e => setField({ ...field, phoneNumber: isNumber(e.target.value) })}
                        message={error.errPhoneNumber}
                    />
                    <AntInput
                        textArea={true}
                        rows={3}
                        maxLen={150}
                        showCount={true}
                        value={field.address}
                        header={trans.address}
                        placeholder={trans.address}
                        onChange={e => setField({ ...field, address: e.target.value })}
                        message={error.errAddress}
                    />
                    <AntInput
                        sizes={"large"}
                        value={field.userName}
                        header={trans.username}
                        placeholder={trans.username}
                        onChange={e => setField({ ...field, userName: e.target.value })}
                        message={error.errUserName}
                    />
                    <AntInput
                        sizes={"large"}
                        type={"email"}
                        value={field.email}
                        header={trans.email}
                        placeholder={trans.email}
                        onChange={e => setField({ ...field, email: e.target.value })}
                        message={error.errEmail}
                    />
                    <AntInput
                        sizes={"large"}
                        type={"password"}
                        value={field.password}
                        header={trans.password}
                        placeholder={trans.password}
                        onChange={e => setField({ ...field, password: e.target.value })}
                        message={error.password}
                    />
                    <AntButton
                        types={"primary"}
                        block={true}
                        content={"Login"}
                        onClick={Register}
                        className={"form-button"}
                    />
                    <div className="login-bottom">
                        Are you a member? <AntButton types={"link"} content={"Login"} onClick={() => history.push("/login")} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage
