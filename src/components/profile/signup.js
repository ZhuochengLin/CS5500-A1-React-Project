import {useState} from "react";
import {useNavigate} from "react-router-dom";
import * as service from "../../services/auth-service";

export const Signup = () => {
    const [newUser, setNewUser] = useState({});
    const navigate = useNavigate();
    const signup = () => {
        service.signup(newUser)
            .then(async () => {
                const user = await service.profile();
                console.log(user);
            })
            .catch(e => alert(e));
    };
    const setpprofile = () => {
        service.setprofile();
    }
    return (
        <div>
            <button onClick={setpprofile}>Test</button>
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
