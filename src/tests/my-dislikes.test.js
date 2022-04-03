import {act, create} from "react-test-renderer";
import MyDislikes from "../components/profile/my-dislikes";
import Tuits from "../components/tuits";

let myDislikeScreen;

test("Tuits component renders in the screen", () => {
    act(() => {
        myDislikeScreen = create(
            <MyDislikes/>
        )
    });
    const myDislikeContent = myDislikeScreen.root;
    const tuitsComponent = myDislikeContent.findByType(Tuits)
    expect(tuitsComponent).toBeTruthy();
})