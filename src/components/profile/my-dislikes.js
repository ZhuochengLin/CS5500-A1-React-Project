import {useEffect, useState} from "react";
import * as service from "../../services/likes-service";
import Tuits from "../tuits";

const MyDislikes = () => {
    const [dislikedTuits, setDislikedTuits] = useState([]);
    const findTuitsIDislike = () => {
        service.findAllTuitsDislikedByUser("me")
            .then((tuits) => {
                setDislikedTuits(tuits);
            })
            .catch(e => alert(e));
    }
    useEffect(findTuitsIDislike, []);
    return (
        <div>
            <Tuits tuits={dislikedTuits} refreshTuits={findTuitsIDislike}/>
        </div>
    )
};
export default MyDislikes;