import React, {useEffect, useState} from "react";
import Tuits from "../tuits";
import {Route, useNavigate, Routes} from "react-router-dom";
import * as service from "../../services/auth-service";
import MyTuits from "./my-tuits";
import MyLikes from "./my-likes";
import MyDislikes from "./my-dislikes";

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  useEffect(async () => {
    try {
      const user = await service.profile();
      setProfile(user);
    } catch (e) {
      navigate("/login");
    }
  }, []);
  const logout = async () =>
      service.logout().then(() => navigate("/login"));
  return(
    <div className="ttr-profile">
      <h4>{profile.username}</h4>
      <h6>@{profile.username}</h6>
      <button onClick={logout}>Logout</button>

      <Routes>
        <Route path="/mytuits" element={<MyTuits/>}/>
        <Route path="/mylikes" element={<MyLikes/>}/>
        <Route path="/mydislikes" element={<MyDislikes/>}/>
      </Routes>

    </div>
  );
}
export default Profile;