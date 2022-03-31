import * as usersService from "../services/users-service";
import * as tuitService from "../services/tuits-service";
import * as likeService from "../services/likes-service";

const MOCK_TUIT = {
    tuit: "This is a test"
};
const MOCK_USAER = {
    username: "test",
    password: "test123"
}

let user;
let tuit;

beforeAll(async () => {
    user = await usersService.createUser(MOCK_USAER);
    tuit = await tuitService.createTuit(user._id, MOCK_TUIT);
})

afterAll(async () => {
    await usersService.deleteUser(user._id);
    await tuitService.deleteTuit(tuit._id);
})

describe("userTogglesLikes", () => {

    test("user first time likes a tuit", async () => {
        expect(tuit.stats.likes).toEqual(0);

        await likeService.userTogglesTuitLikes(user._id, tuit._id);
        tuit = await tuitService.findTuitById(tuit._id);
        expect(tuit.stats.likes).toEqual(1);

        const tuitsLikedByUser = await likeService.findAllTuitsLikedByUser(user._id);
        expect(1).toEqual(tuitsLikedByUser.length);
        expect(tuit.tuit).toEqual(MOCK_TUIT.tuit);

        // clean up
        await likeService.userTogglesTuitLikes(user._id, tuit._id);
        tuit = await tuitService.findTuitById(tuit._id);
    })

    test("user likes a tuit when already likes it", async () => {
        expect(tuit.stats.likes).toEqual(0);

        await likeService.userTogglesTuitLikes(user._id, tuit._id);
        tuit = await tuitService.findTuitById(tuit._id);
        expect(tuit.stats.likes).toEqual(1);

        await likeService.userTogglesTuitLikes(user._id, tuit._id);
        tuit = await tuitService.findTuitById(tuit._id);
        expect(tuit.stats.likes).toEqual(0);
    })

    test("user likes a tuit when already dislikes it", async () => {
        expect(tuit.stats.likes).toEqual(0);
        expect(tuit.stats.dislikes).toEqual(0);

        await likeService.userTogglesTuitDislikes(user._id, tuit._id);
        tuit = await tuitService.findTuitById(tuit._id);
        expect(tuit.stats.dislikes).toEqual(1);

        await likeService.userTogglesTuitLikes(user._id, tuit._id);
        tuit = await tuitService.findTuitById(tuit._id);
        expect(tuit.stats.likes).toEqual(1);
        expect(tuit.stats.dislikes).toEqual(0);

        // clean up
        await likeService.userTogglesTuitLikes(user._id, tuit._id);
        tuit = await tuitService.findTuitById(tuit._id);
    })
})

describe("userTogglesDislikes", () => {

    test("user first time dislikes a tuit", async () => {
        expect(tuit.stats.dislikes).toEqual(0);

        await likeService.userTogglesTuitDislikes(user._id, tuit._id);
        tuit = await tuitService.findTuitById(tuit._id);
        expect(tuit.stats.dislikes).toEqual(1);

        // clean up
        await likeService.userTogglesTuitDislikes(user._id, tuit._id);
        tuit = await tuitService.findTuitById(tuit._id);
    })

    test("user dislikes a tuit when already dislikes it", async () => {
        expect(tuit.stats.dislikes).toEqual(0);

        await likeService.userTogglesTuitDislikes(user._id, tuit._id);
        tuit = await tuitService.findTuitById(tuit._id);
        expect(tuit.stats.dislikes).toEqual(1);

        await likeService.userTogglesTuitDislikes(user._id, tuit._id);
        tuit = await tuitService.findTuitById(tuit._id);
        expect(tuit.stats.dislikes).toEqual(0);
    })

    test("user dislikes a tuit when already likes it", async () => {
        expect(tuit.stats.dislikes).toEqual(0);
        expect(tuit.stats.likes).toEqual(0);

        await likeService.userTogglesTuitLikes(user._id, tuit._id);
        tuit = await tuitService.findTuitById(tuit._id);
        expect(tuit.stats.likes).toEqual(1);
        expect(tuit.stats.dislikes).toEqual(0);

        await likeService.userTogglesTuitDislikes(user._id, tuit._id);
        tuit = await tuitService.findTuitById(tuit._id);
        expect(tuit.stats.likes).toEqual(0);
        expect(tuit.stats.dislikes).toEqual(1);

        // clean up
        await likeService.userTogglesTuitDislikes(user._id, tuit._id);
        tuit = await tuitService.findTuitById(tuit._id);
    })
})

describe("userAlreadyLikesTuit", () => {

    test("user already likes tuit", async () => {
        expect(tuit.stats.likes).toEqual(0);

        await likeService.userTogglesTuitLikes(user._id, tuit._id);
        const like = await likeService.userAlreadyLikesTuit(user._id, tuit._id);
        expect(like).toBeTruthy();

        // clean up
        await likeService.userTogglesTuitLikes(user._id, tuit._id);
        tuit = await tuitService.findTuitById(tuit._id);
    })

    test("user does not like a tuit", async () => {
        const like = await likeService.userAlreadyLikesTuit(user._id, tuit._id);
        expect(like).toBeFalsy();
    })

})

describe("userAlreadyDislikesTuit", () => {

    test("user already dislikes tuit", async () => {
        expect(tuit.stats.dislikes).toEqual(0);

        await likeService.userTogglesTuitDislikes(user._id, tuit._id);
        const dislike = await likeService.userAlreadyDislikesTuit(user._id, tuit._id);
        expect(dislike).toBeTruthy();

        // clean up
        await likeService.userTogglesTuitDislikes(user._id, tuit._id);
        tuit = await tuitService.findTuitById(tuit._id);
    })

    test("user does not dislike a tuit", async () => {
        const dislike = await likeService.userAlreadyDislikesTuit(user._id, tuit._id);
        expect(dislike).toBeFalsy();
    })

})