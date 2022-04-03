import {act, create} from "react-test-renderer";
import TuitStats from "../components/tuits/tuit-stats";
import * as likeService from "../services/likes-service";

const MOCK_TUIT = {tuit: "this is a test", stats: {likes: 0, dislikes: 0}};
const MOCK_STATS = {likes: 5, dislikes: 6};
let tuitStats;

jest.mock("../services/likes-service")

const likeTuit = (t) => {
    t.stats.likes++;
    tuitStats.update(
        <TuitStats tuit={t}/>
    );
}

const dislikeTuit = (t) => {
    t.stats.dislikes++;
    tuitStats.update(
        <TuitStats tuit={t}/>
    );
}

describe("tuit stats renders correctly", () => {

    test("no likes and no dislikes", () => {
        act(() => {
            tuitStats = create(
                <TuitStats tuit={MOCK_TUIT}/>
            )

        });
        const root = tuitStats.root;
        const likesStats = root.findByProps({className: "ttr-stats-likes"}).findByType("span").props.children;
        const dislikeStats = root.findByProps({className: "ttr-stats-dislikes"}).findByType("span").props.children;
        const liked = likesStats[0];
        const likesCount = likesStats[2];
        const disliked = dislikeStats[0]
        const dislikeCount = likesStats[2];
        expect(liked).toBeFalsy();
        expect(likesCount).toBe(0);
        expect(disliked).toBeFalsy();
        expect(dislikeCount).toBe(0);
    })

    test("with likes and dislikes", () => {
        act(() => {
            tuitStats = create(
                <TuitStats tuit={{...MOCK_TUIT, stats: MOCK_STATS}}/>
            )
        });
        const root = tuitStats.root;
        const likesStats = root.findByProps({className: "ttr-stats-likes"}).findByType("span").props.children;
        const dislikeStats = root.findByProps({className: "ttr-stats-dislikes"}).findByType("span").props.children;
        const liked = likesStats[0];
        const likesCount = likesStats[2];
        const disliked = dislikeStats[0]
        const dislikeCount = dislikeStats[2];
        expect(liked).toBeFalsy();
        expect(likesCount).toBe(5);
        expect(disliked).toBeFalsy();
        expect(dislikeCount).toBe(6);
    })

    test("click like button", async () => {
        act(() => {
            tuitStats = create(
                <TuitStats tuit={MOCK_TUIT} likeTuit={likeTuit}/>
            )
        });
        const root = tuitStats.root;
        const likeButton = root.findByProps({className: "ttr-stats-likes"}).findByType("span");
        let likesStats = root.findByProps({className: "ttr-stats-likes"}).findByType("span").props.children;
        let liked = likesStats[0];
        let likesCount = likesStats[2];
        expect(liked).toBeFalsy();
        expect(likesCount).toBe(0);
        act(() => {
            likeButton.props.onClick();
        });
        likesStats = root.findByProps({className: "ttr-stats-likes"}).findByType("span").props.children;
        liked = likesStats[0];
        likesCount = likesStats[2];
        expect(liked).toBeFalsy();
        expect(likesCount).toBe(1);
    })

    test("click dislike button", async () => {
        act(() => {
            tuitStats = create(
                <TuitStats tuit={MOCK_TUIT} dislikeTuit={dislikeTuit}/>
            )
        });
        const root = tuitStats.root;
        const dislikeButton = root.findByProps({className: "ttr-stats-dislikes"}).findByType("span");
        let dislikesStats = root.findByProps({className: "ttr-stats-dislikes"}).findByType("span").props.children;
        let disliked = dislikesStats[0];
        let dislikesCount = dislikesStats[2];
        expect(disliked).toBeFalsy();
        expect(dislikesCount).toBe(0);
        act(() => {
            dislikeButton.props.onClick();
        });
        dislikesStats = root.findByProps({className: "ttr-stats-dislikes"}).findByType("span").props.children;
        disliked = dislikesStats[0];
        dislikesCount = dislikesStats[2];
        expect(disliked).toBeFalsy();
        expect(dislikesCount).toBe(1);
    })

})