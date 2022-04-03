import {UserList} from "../components/profile/user-list";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import * as userService from "../services/users-service";

jest.setTimeout(10000);

const MOCKED_USERS = [
    "ellen_ripley", "sarah_conor"
]
let users = [];

beforeAll(async () => {
  for (let user of MOCKED_USERS) {
    users.push(await userService.createUser({username: user, password: `${user}123`}));
  }
})

afterAll(async () => {
  for (let user of users) {
    await userService.deleteUser(user._id);
  }
})

test('user list renders async', async () => {
  const users = await userService.findAllUsers();
  render(
    <HashRouter>
      <UserList users={users}/>
    </HashRouter>);
  MOCKED_USERS.forEach(
      (user) => {
        const linkElement = screen.getByText(user, {exact: false});
        expect(linkElement).toBeInTheDocument();
      }
  )
})
