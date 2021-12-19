import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import './style/App.scss';
import 'antd/dist/antd.css'
import { Helmet } from 'react-helmet'
import Profile from './pages/Profile'
import UserManagement from './pages/UserManagement'
import TaskManagement from './pages/TaskManagement'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import { isDarkType, isLightType } from './redux/action_types';
import { getUsers, setLoginUser } from './redux/actions/users_ac';
import { getFromLocalStorage, setLocalStorage } from './config/utils';
import { tasks as fakeTasks, users as fakeUsers } from './config/defaultData'
import { getTasks } from './redux/actions/task_ac'

function App() {
  const theme = useSelector(state => state.theme);
  const users = useSelector(state => state.users)
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.theme != null)
      dispatch({ type: localStorage.theme === "dark" ? isDarkType : isLightType });
    if (localStorage.lang != null)
      dispatch({ type: localStorage.lang })

    if (!users.loginUser && getFromLocalStorage("registerUsers"))
      dispatch(setLoginUser(getFromLocalStorage("registerUsers")))

    if (!getFromLocalStorage("tasks"))
      setLocalStorage("tasks", fakeTasks)

    if (!getFromLocalStorage("users"))
      setLocalStorage("users", fakeUsers)
  })

  return (
    <>
      <Helmet>
        <html data-theme={localStorage.theme !== null ? localStorage.theme : theme} />
        <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' />
      </Helmet>
      <Router>
        <Switch>
          <Route path='/' exact component={Profile} />
          <Route path='/profile' exact component={Profile} />
          <Route path='/user-management' component={UserManagement} />
          <Route path='/task-management' component={TaskManagement} />
          <Route path='/login' component={LoginPage} />
          <Route path='/register' component={RegisterPage} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
