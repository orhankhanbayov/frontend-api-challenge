const chitterClient = require("../src/chitterClient");

describe("chitterClient", () => {
  it("returns handle and user id when signing up", async () => {
    let client = new chitterClient();
    let username = "orhan" + Math.floor(Math.random() * 100000000) + 10000000;
    details = { handle: username, password: "mypassword" };
    let response = await client.createUser(details);
    expect(response.handle).toEqual(username);
  });

  it("returns handle already taken when post called on signup", async () => {
    let client = new chitterClient();
    details = { handle: "orhan", password: "mypassword" };
    let response = await client.createUser(details);
    expect(response.handle).toEqual(["has already been taken"]);
  });
});
