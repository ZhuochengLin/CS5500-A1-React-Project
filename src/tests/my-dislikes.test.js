import MyDislikes from "../components/profile/my-dislikes";
import {act} from "react-dom/test-utils";
import ReactDOM from "react-dom";
import React from "react";
import {login} from "../services/auth-service";

jest.setTimeout(10000);

test("my-dislike screen renders", async () => {
    await login({username: "myTest", password: "12345"});
    const el = document.createElement("div");
    act(() => {
        ReactDOM.render(<MyDislikes/>, el);
    });
    console.log(el.textContent)
})