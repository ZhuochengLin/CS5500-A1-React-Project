import {useEffect, useState} from "react";
import * as service from "../../services/tuits-service";
import Tuits from "../tuits";

const MyTuits = () => {
    const [tuits, setTuits] = useState();
    const findMyTuits = () => {
        service.findTuitByUser("me").then(tuits => setTuits(tuits));
    };
    useEffect(findMyTuits, []);
    const deleteTuit = (tid) =>
        service.deleteTuit(tid).then(() => findMyTuits());
    const refreshPage = () => {
        window.location.reload();
    }
    return (
        <Tuits tuits={tuits} deleteTuit={deleteTuit} refreshTuits={refreshPage}/>
    )
};

export default MyTuits;