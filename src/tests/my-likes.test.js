import {act, create} from "react-test-renderer";
import MyLikes from "../components/profile/my-likes";
import Tuits from "../components/tuits";

let myLikeScreen;

test("Tuits component renders in the screen", () => {
    act(() => {
        myLikeScreen = create(
            <MyLikes/>
        )
    });
    const myLikeContent = myLikeScreen.root;
    const tuitsComponent = myLikeContent.findByType(Tuits)
    expect(tuitsComponent).toBeTruthy();
})