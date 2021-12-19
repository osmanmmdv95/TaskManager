import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AntButton from '../components/UIElement/AntButton'
import AntInput from '../components/UIElement/AntInput'
import { login } from '../redux/actions/users_ac';

function LoginPage() {
    const history = useHistory();
    const dispatch = useDispatch()
    var fields = {
        email: '',
        password: ''
    };
    var errors = {
        errEmail: '',
        errPassword: ''
    };
    const [field, setField] = useState(fields)
    const [error, setError] = useState(errors)
    const trans = useSelector(state => state.trans)

    const Login = () => {
        if (validation()) {
            dispatch(login(field))
        }
    }

    const validation = () => {
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
        if (field.password.search(/[^a-zA-Z]+/) < 0) {
            setError({ errEmail: "Your password must contain at least one letter" })
            return false
        }
        if (field.password.search(/[0-9]/) < 0) {
            setError({ errEmail: "Your password must contain at least one number" })
            return false
        }
        return true;
    }

    return (
        <div className="main">
            <div className="login-container">
                <div className="login-box">
                    <div className="login-page-title">
                        Task Manager Login
                    </div>
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
                        onClick={Login}
                        className="form-button"
                    />
                    <div className="login-bottom">
                        Don't Have an Account? <AntButton types={"link"} content={"Register"} onClick={() => history.push("/register")} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
