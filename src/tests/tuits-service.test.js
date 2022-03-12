import {
    createTuit,
    deleteTuit,
    findAllTuits,
    findTuitById,
    findTuitByUser,
    updateTuit
} from "../services/tuits-service";
import {createUser, deleteUser} from "../services/users-service";

jest.setTimeout(10000);

let testUser = {
    username: "test_zclin",
    password: "test123"
};

beforeAll(async () => {
    testUser = await createUser(testUser);
})

afterAll(() => {
    return deleteUser(testUser._id);
})

describe("createTuit", () => {
    let testTuit = {
        tuit: "Hello World"
    };
    afterAll(() => {
        return deleteTuit(testTuit._id);
    })
    test("can create tuit with REST API", async () => {
        testTuit = await createTuit(testUser._id, testTuit);
        const insertedTuit = await findTuitById(testTuit._id);
        expect(insertedTuit.content).toEqual(testTuit.content);
        expect(insertedTuit.postedBy).toEqual(testUser._id);
    });
});

describe("deleteTuit", () => {
    let testTuit = {
        tuit: "Hello World"
    };
    test("can delete tuit with REST API", async () => {
        testTuit = await createTuit(testUser._id, testTuit);
        let userTuits = await findTuitByUser(testUser._id);
        expect(userTuits.length).toEqual(1);

        const status = await deleteTuit(testTuit._id);
        expect(status.deletedCount).toEqual(1);
        userTuits = await findTuitByUser(testUser._id);
        expect(userTuits.length).toEqual(0);
    });
});

describe("findTuitById", () => {
    let testTuit = {
        tuit: "Hello World"
    };
    beforeAll(async () => {
        testTuit = await createTuit(testUser._id, testTuit);
    })
    afterAll(() => {
        return deleteTuit(testTuit._id);
    })
    test("can retrieve a tuit by their prmary key with REST API", async () => {
        const insertedTuit = await findTuitById(testTuit._id);
        expect(insertedTuit._id).toEqual(testTuit._id);
        expect(insertedTuit.tuit).toEqual(testTuit.tuit);
        expect(insertedTuit.postedBy).toEqual(testUser._id);
    })
});

describe("findTuits", () => {
    let testTuits = [
        "This", "is", "a", "test"
    ];
    beforeAll(() => {
        return Promise.all(testTuits.map(tuit => createTuit(testUser._id, {tuit: tuit})));
    });
    afterAll(async () => {
        const insertedTuits = await findTuitByUser(testUser._id);
        return Promise.all(insertedTuits.map(tuit => deleteTuit(tuit._id)));
    });
    test("can retrieve all tuits with REST API", async () => {
        const allTuits = await findAllTuits();
        expect(allTuits.length).toBeGreaterThanOrEqual(testTuits.length);

        // test tuits exist in all tuits
        const insertedTuits = allTuits.filter(tuit => testTuits.indexOf(tuit.tuit) >= 0);
        expect(insertedTuits.length).toEqual(testTuits.length);
        // verify each test tuit content
        testTuits.forEach(tuitContent => {
            const insertedOne = insertedTuits.find(tuit => tuit.tuit === tuitContent);
            expect(insertedOne.postedBy._id).toEqual(testUser._id);
        })
    })
    test("can retrieve all tuits by user with REST APIl", async () => {
        // user info will be populated
        const insertedTuits = await findTuitByUser(testUser._id);
        // check tuit belongs to the user
        testTuits.forEach(tuitContent => {
            const insertedOne = insertedTuits.find(tuit => tuit.tuit === tuitContent);
            expect(insertedOne.postedBy.username).toEqual(testUser.username);
            expect(insertedOne.postedBy.password).toEqual(testUser.password);
        });
    });
});

describe("updateTuit", () => {
    let testTuit = {
        tuit: "Hello World"
    };
    beforeAll(async () => {
        testTuit = await createTuit(testUser._id, testTuit);
    })
    afterAll(() => {
        return deleteTuit(testTuit._id);
    })
    test("can update tuit with REST API", async () => {
        // old content
        let insertedTuit = await findTuitById(testTuit._id);
        expect(insertedTuit.tuit).toEqual(testTuit.tuit);

        const newContent = "brand new";
        await updateTuit(insertedTuit._id, {tuit: newContent});
        insertedTuit = await findTuitById(testTuit._id);
        expect(insertedTuit.tuit).toEqual(newContent);
    });
});