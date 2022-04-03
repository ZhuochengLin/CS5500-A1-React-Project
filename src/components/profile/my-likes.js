import {useEffect, useState} from "react";
import * as service from "../../services/likes-service";
import Tuits from "../tuits";

const MyLikes = () => {
    const [likedTuits, setLikedTuits] = useState([]);
    const findTuitsILike = () => {
        service.findAllTuitsLikedByUser("me")
            .then((tuits) => setLikedTuits(tuits))
            .catch(e => alert(e));
    }
    useEffect(findTuitsILike, []);
    return (
        <div>
            <Tuits tuits={likedTuits} refreshTuits={findTuitsILike}/>
        </div>
    )
};
export default MyLikes;