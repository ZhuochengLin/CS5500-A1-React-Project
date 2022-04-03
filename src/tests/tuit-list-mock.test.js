import Tuits from "../components/tuits";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import * as tuitService from "../services/tuits-service";

jest.mock("../services/tuits-service");

const MOCKED_USERS = [
  "alice", "bob", "charlie"
];

const MOCKED_TUITS_CONTENT = [
    "alice's tuit", "bob's tuit", "charlie's tuit"
]

const MOCKED_TUITS = []
for (let i = 0; i < MOCKED_USERS.length; i++) {
    MOCKED_TUITS.push({_id: `${i}`, tuit: MOCKED_TUITS_CONTENT[i], postedBy: {username: MOCKED_USERS[i]}});
}


test('tuit list renders static tuit array', () => {
    render(
        <HashRouter>
            <Tuits tuits={MOCKED_TUITS}/>
        </HashRouter>
    );
    MOCKED_USERS.forEach((user) => {
        const element = screen.getByText(`${user}@${user}`, {exact: false});
        expect(element).toBeInTheDocument();
  });
});

test('tuit list renders mocked', async () => {
    tuitService.findAllTuits.mockImplementation(() => MOCKED_TUITS)
    const tuits = await tuitService.findAllTuits();
    render(
        <HashRouter>
            <Tuits tuits={tuits}/>
        </HashRouter>
    );
    MOCKED_USERS.forEach((user) => {
        const element = screen.getByText(`${user}@${user}`, {exact: false});
        expect(element).toBeInTheDocument();
    });
});
