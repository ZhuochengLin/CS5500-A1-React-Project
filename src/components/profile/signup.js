import {useState} from "react";
import {useNavigate} from "react-router-dom";
import * as service from "../../services/auth-service";

export const Signup = () => {
    const [newUser, setNewUser] = useState({});
    const navigate = useNavigate();
    const signup = () => {
        service.signup(newUser)
            .then(() => navigate("/profile/mytuits"))
            .catch(e => alert(e));
    };
    return (
        <div>
            <h1>Signup</h1>
            <label>
                Username:
                <input onChange={(e) =>
                    setNewUser({...newUser, username: e.target.value})}/>
            </label>
            <label>
                Password:
                <input type="password" onChange={(e) =>
                    setNewUser({...newUser, password: e.target.value})}/>
            </label>
            <label>
                Email:
                <input type="email" onChange={(e) =>
                    setNewUser({...newUser, email: e.target.value})}/>
            </label>
            <button onClick={signup}>Signup</button>
        </div>
    )
};
