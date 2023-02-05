const chitterClient = require("./chitterClient");
const User = require("./userModel");
const chitterView = require("./chitterView");

const client = new chitterClient();
const user = new User();
const view = new chitterView(client, user);

view.displayLogin();
view.logOutDisplay();
view.signUpPage();
view.displayPeeps();
// view.writePeepDisplay();

view.logo();
