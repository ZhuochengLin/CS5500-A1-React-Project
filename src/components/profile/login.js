import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import * as service from "../../services/auth-service";
import * as userService from "../../services/users-service";
import React from "react";
import {UserList} from "./user-list";

export const Login = () => {
    const [existingUsers, setExistingUsers] = useState([]);
    const [loginUser, setLoginUser] = useState({});
    const navigate = useNavigate();
    const login = () => service.login(loginUser)
        .then((user) => navigate("/profile/mytuits"))
        .catch(e => alert(e));
    const findAllUsers = () => {
        userService.findAllUsers()
            .then((users) => setExistingUsers(users));
    }
    const deleteUser = (uid) =>
        userService.deleteUser(uid)
            .then(findAllUsers)
    useEffect(findAllUsers, []);
    return (
        <div>
            <h1>Login</h1>
            <label htmlFor="username">Username: </label>
            <input id="username" onChange={(e) =>
                setLoginUser({...loginUser, username: e.target.value})}/>
            <label htmlFor="password">Password: </label>
            <input id="password" type={"password"} onChange={(e) =>
                setLoginUser({...loginUser, password: e.target.value})}/>
            <button onClick={login}>Login</button>

            <UserList users={existingUsers} deleteUser={deleteUser}/>
        </div>
    )
};