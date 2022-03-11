import Tuits from "../components/tuits";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";
import axios from "axios";

jest.mock('axios');

const MOCKED_USERS = [
  "alice", "bob", "charlie"
];

const MOCKED_TUITS = [
    {_id: "123", tuit: "alice's tuit", postedBy: {username: "alice"}, published: "2022-03-05T16:51:44.237Z"},
    {_id: "234", tuit: "bob's tuit", postedBy: {username: "bob"}, published: "2022-03-05T16:51:44.237Z"},
    {_id: "345", tuit: "charlie's tuit", postedBy: {username: "charlie"}, published: "2022-03-05T16:51:44.237Z"}
];

test('tuit list renders static tuit array', () => {
  render(
      <HashRouter>
        <Tuits tuits={MOCKED_TUITS}/>
      </HashRouter>
  );
  const users = ["alice", "bob", "charlie"];
  users.forEach((user) => {
      const element = screen.getByText(`${user}@${user}`, {exact: false});
      expect(element).toBeInTheDocument();
  });
});

test('tuit list renders async', async () => {
  // TODO: implement this
})

test('tuit list renders mocked', async () => {
    axios.get.mockImplementation(() =>
        Promise.resolve({data: {tuits: MOCKED_TUITS}}));
    const response = await findAllTuits();
    const tuits = response.tuits;

    render(
        <HashRouter>
            <Tuits tuits={tuits}/>
        </HashRouter>
    );
    const users = ["alice", "bob", "charlie"];
    users.forEach((user) => {
        const element = screen.getByText(`${user}@${user}`, {exact: false});
        expect(element).toBeInTheDocument();
    });
});
