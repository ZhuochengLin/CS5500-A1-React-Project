import Tuits from "../components/tuits";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";

jest.setTimeout(10000);

test('tuit list renders async', async () => {
  const tuits = await findAllTuits();
  render(
      <HashRouter>
          <Tuits tuits={tuits}/>
      </HashRouter>
  );
  const existingUsers = ["NASA", "SpaceX"];
  existingUsers.forEach((user) => {
      const linkElements = screen.getAllByText("NASA@NASA", {exact: false});
      linkElements.forEach((e) => {expect(e).toBeInTheDocument()});
  })
})
