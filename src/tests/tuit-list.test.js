import Tuits from "../components/tuits";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";
import * as userService from "../services/users-service";
import * as tuitService from "../services/tuits-service";

jest.setTimeout(10000);

const MOCKED_USER = "testUser";
let user;

const MOCKED_TUITS_CONTENT = [
    "alice's tuit", "bob's tuit", "charlie's tuit"
]
let tuits = [];

beforeAll(async () => {
    user = await userService.createUser({username: MOCKED_USER, password: "123"});
    for (let t of MOCKED_TUITS_CONTENT) {
        tuits.push(
            await tuitService.createTuit(user._id, {tuit: t})
        );
    }
})

afterAll(async () => {
    await userService.deleteUser(user._id);
    for (let t of tuits) {
        await tuitService.deleteTuit(t._id);
    }
})

test('tuit list renders async', async () => {
    const tuits = await findAllTuits();
    render(
        <HashRouter>
            <Tuits tuits={tuits}/>
        </HashRouter>
    );
    MOCKED_TUITS_CONTENT.forEach((t) => {
        const linkElement = screen.getByText(t, {exact: false});
        expect(linkElement).toBeInTheDocument();
    })
})
