import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;
const USERS_API = `${BASE_URL}/api/users`;

const api = axios.create({
    withCredentials: true
});

export const userTogglesTuitLikes = (uid, tid) =>
    api.put(`${USERS_API}/${uid}/likes/${tid}`)
        .then(response => response.data);

export const userTogglesTuitDislikes = (uid, tid) =>
    api.put(`${USERS_API}/${uid}/dislikes/${tid}`)
        .then(response => response.data);

export const userAlreadyLikesTuit = (uid, tid) =>
    api.get(`${USERS_API}/${uid}/likes/${tid}`)
        .then(response => response.data);

export const userAlreadyDislikesTuit = (uid, tid) =>
    api.get(`${USERS_API}/${uid}/dislikes/${tid}`)
        .then(response => response.data);

export const findAllTuitsLikedByUser = (uid) =>
    api.get(`${USERS_API}/${uid}/likes`)
        .then(response => response.data);

export const findAllTuitsDislikedByUser = (uid) =>
    api.get(`${USERS_API}/${uid}/dislikes`)
        .then(response => response.data);