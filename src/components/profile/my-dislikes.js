import {useEffect, useState} from "react";
import * as service from "../../services/likes-service";
import Tuits from "../tuits";

const MyDislikes = () => {
    const [dislikedTuits, setDislikedTuits] = useState([
        {_id: "default", tuit: "default tuit content", postedBy: {username: "default"}}
    ]);
    const findTuitsIDislike = () => {
        return service.findAllTuitsDislikedByUser("me")
            .then((tuits) => {
                setDislikedTuits(tuits);
            })
            .catch(e => alert(e));
    }
    useEffect(() => {
        let isMounted = true;
        findTuitsIDislike();
        return () => {isMounted = false;}
    }, []);
    return (
        <div>
            <Tuits tuits={dislikedTuits} refreshTuits={findTuitsIDislike}/>
        </div>
    )
};
export default MyDislikes;