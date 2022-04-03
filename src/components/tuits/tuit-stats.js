import React, {useEffect, useState} from "react";
import * as service from "../../services/likes-service";

const TuitStats = ({tuit, likeTuit, dislikeTuit}) => {
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const updateLikes = async () => {
        const alreadyLiked = await service.userAlreadyLikesTuit("me", tuit._id);
        setLiked(!!alreadyLiked);
        const alreadyDisliked = await service.userAlreadyDislikesTuit("me", tuit._id);
        setDisliked(!!alreadyDisliked);
    }
    useEffect(updateLikes, [tuit])
    return (
        <div className="row mt-2">
            <div className="col">
                <i className="far fa-message me-1"/>
                {tuit.stats && tuit.stats.replies}
            </div>
            <div className="col">
                <i className="far fa-retweet me-1"/>
                {tuit.stats && tuit.stats.retuits}
            </div>
            <div className="col">
                <span className={"ttr-stats-likes"} onClick={() => likeTuit(tuit)}>
                    {
                        liked && <i className="fa-solid fa-thumbs-up" style={{color: "red"}}/>
                    }
                    {
                        !liked && <i className="fa-solid fa-thumbs-up"/>
                    }
                    {tuit.stats && tuit.stats.likes}
                </span>
            </div>
            <div className="col">
                <span className={"ttr-stats-dislikes"} onClick={() => dislikeTuit(tuit)}>
                    {
                        disliked && <i className="fa-solid fa-thumbs-down" style={{color: "red"}}/>
                    }
                    {
                        !disliked && <i className="fa-solid fa-thumbs-down"/>
                    }
                    {tuit.stats && tuit.stats.dislikes}
                </span>
            </div>
            <div className="col">
                <i className="far fa-inbox-out"/>
            </div>
        </div>
    );
};
export default TuitStats;