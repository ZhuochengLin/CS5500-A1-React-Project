import {act, create} from "react-test-renderer";
import MyTuits from "../components/profile/my-tuits";
import Tuits from "../components/tuits";

let myTuitsScreen;

test("Tuits component renders in the screen", () => {
    act(() => {
        myTuitsScreen = create(
            <MyTuits/>
        )
    });
    const myTuitsContent = myTuitsScreen.root;
    const tuitsComponent = myTuitsContent.findByType(Tuits)
    expect(tuitsComponent).toBeTruthy();
})