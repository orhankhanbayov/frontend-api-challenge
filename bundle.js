(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // src/chitterClient.js
  var require_chitterClient = __commonJS({
    "src/chitterClient.js"(exports, module) {
      var chitterClient2 = class {
        async createUser(details) {
          let response = await fetch(
            "https://chitter-backend-api-v2.herokuapp.com/users",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ user: details })
            }
          );
          let json = await response.json();
          return json;
        }
        async sessions(session) {
          try {
            let response = await fetch(
              "https://chitter-backend-api-v2.herokuapp.com/sessions",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({ session })
              }
            );
            if (!response.ok) {
              throw new Error(
                "Login failed. Please check your username and password."
              );
            }
            let json = await response.json();
            return json;
          } catch (error) {
            console.error(error);
            alert(error.message);
          }
        }
        async loadPeeps() {
          let response = await fetch(
            "https://chitter-backend-api-v2.herokuapp.com/peeps"
          );
          let json = await response.json();
          return json;
        }
        async loadPeepById(id) {
          let response = await fetch(
            `https://chitter-backend-api-v2.herokuapp.com/peeps/${id}`
          );
          let json = await response.json();
          return json;
        }
        async postPeep(peep, session_key) {
          const response = await fetch(
            "https://chitter-backend-api-v2.herokuapp.com/peeps",
            {
              method: "POST",
              headers: {
                Authorization: `Token token=${session_key}`,
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ peep })
            }
          );
          const result = await response.json();
          return result;
        }
        async deletePeep(id, session) {
          const response = await fetch(
            `https://chitter-backend-api-v2.herokuapp.com/peeps/${id}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Token token=${session}`,
                "Content-Type": "application/json"
              }
            }
          );
          return response;
        }
        async likePeep(peep_id, user_id, session) {
          const response = await fetch(
            `https://chitter-backend-api-v2.herokuapp.com/peeps/${peep_id}/likes/${user_id}`,
            {
              method: "PUT",
              headers: {
                Authorization: `Token token=${session}`
              }
            }
          );
          return response;
        }
        async unlikePeep(peep_id, user_id, session) {
          const response = await fetch(
            `https://chitter-backend-api-v2.herokuapp.com/peeps/${peep_id}/likes/${user_id}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Token token=${session}`
              }
            }
          );
          return response;
        }
      };
      module.exports = chitterClient2;
    }
  });

  // src/userModel.js
  var require_userModel = __commonJS({
    "src/userModel.js"(exports, module) {
      var User2 = class {
        constructor() {
          this.handle = void 0;
          this.user_id = void 0;
          this.session_key = void 0;
        }
        setUserInfo(handle, user_id, session_key) {
          this.handle = handle;
          this.user_id = user_id;
          this.session_key = session_key;
        }
        logOut() {
          this.handle = void 0;
          this.user_id = void 0;
          this.session_key = void 0;
        }
        loggedIn() {
          if (this.session_key === void 0) {
            return false;
          } else {
            return true;
          }
        }
      };
      module.exports = User2;
    }
  });

  // src/chitterView.js
  var require_chitterView = __commonJS({
    "src/chitterView.js"(exports, module) {
      var chitterView2 = class {
        constructor(client2, user2) {
          this.client = client2;
          this.user = user2;
        }
        signUpPage() {
          let newButton = document.createElement("BUTTON");
          newButton.id = "sign-up-link";
          newButton.innerText = "Sign Up";
          document.querySelector("body").append(newButton);
          newButton.addEventListener("click", () => {
            this.displaySignUp();
          });
        }
        displaySignUp() {
          let body = document.querySelector("body");
          const handle = document.createElement("input");
          handle.setAttribute("type", "text");
          handle.setAttribute("id", "handle");
          handle.setAttribute("placeholder", "Handle");
          body.append(handle);
          const password = document.createElement("input");
          password.setAttribute("type", "password");
          password.setAttribute("id", "password");
          password.setAttribute("placeholder", "Password");
          body.append(password);
          const newSignUpButton = document.createElement("BUTTON");
          newSignUpButton.id = "sign-up-button";
          newSignUpButton.innerHTML = "Sign up";
          body.append(newSignUpButton);
          newSignUpButton.addEventListener("click", () => {
            this.signUp();
            document.querySelector("#sign-up-link").style.display = "none";
            document.querySelector("#handle").style.display = "none";
            document.querySelector("#password").style.display = "none";
            document.querySelector("#sign-up-button").style.display = "none";
          });
        }
        async signUp() {
          let username = document.querySelector("#handle").value;
          let pass = document.querySelector("#password").value;
          let details = { handle: username, password: pass };
          let response = await this.client.createUser(details);
          if (response.handle === username) {
            if (!!document.querySelector("#sign-up-error")) {
              document.querySelector("#sign-up-error").remove();
            }
            let newElement = document.createElement("p");
            newElement.id = "sign-up-success";
            newElement.textContent = "You have signed up to Chitter";
            document.querySelector("body").append(newElement);
            console.log("signed up");
          } else {
            let newElement = document.createElement("p");
            newElement.id = "sign-up-error";
            newElement.textContent = "Sorry this handle has already been taken";
            document.querySelector("body").append(newElement);
            console.log("handle already taken");
          }
        }
        displayLogin() {
          let body = document.querySelector("body");
          const handle = document.createElement("input");
          handle.setAttribute("type", "text");
          handle.setAttribute("id", "login-handle");
          handle.setAttribute("placeholder", "Handle");
          body.append(handle);
          const password = document.createElement("input");
          password.setAttribute("type", "password");
          password.setAttribute("id", "login-password");
          password.setAttribute("placeholder", "Password");
          body.append(password);
          let loginButton = document.createElement("BUTTON");
          loginButton.id = "login-button";
          loginButton.innerHTML = "Login";
          body.append(loginButton);
          loginButton.addEventListener("click", async () => {
            await this.login();
            this.loggedInHide();
            this.logInClear();
            this.clearPeeps();
            this.displayPeeps();
            this.writePeepDisplay();
          });
        }
        logInClear() {
          document.querySelector("#login-handle").value = "";
          document.querySelector("#login-password").value = "";
        }
        loggedInHide() {
          document.querySelector("#login-handle").style.display = "none";
          document.querySelector("#login-password").style.display = "none";
          document.querySelector("#login-button").style.display = "none";
          document.querySelector("#log-out-button").style.display = "block";
          document.querySelector("#sign-up-link").style.display = "none";
        }
        loggedOutHide() {
          let button = document.querySelectorAll(".delete-button");
          button.forEach((each) => {
            each.remove();
          });
          document.querySelector("#peep-input").remove();
          document.querySelector("#peep-button").remove();
        }
        async login() {
          let username = document.querySelector("#login-handle").value;
          let pass = document.querySelector("#login-password").value;
          let session = { handle: username, password: pass };
          let response = await this.client.sessions(session);
          this.user.setUserInfo(username, response.user_id, response.session_key);
          console.log(response);
        }
        logOut() {
          this.user.setUserInfo(void 0, void 0, void 0);
        }
        logOutDisplay() {
          let logOutButton = document.createElement("BUTTON");
          logOutButton.id = "log-out-button";
          logOutButton.innerHTML = "Logout";
          logOutButton.style.display = "none";
          document.querySelector("body").append(logOutButton);
          logOutButton.addEventListener("click", () => {
            this.user.logOut();
            console.log("logged out");
            this.loggedOutHide();
            this.clearLikes();
            document.querySelector("#log-out-button").style.display = "none";
            document.querySelector("#login-handle").style.display = "block";
            document.querySelector("#login-password").style.display = "block";
            document.querySelector("#login-button").style.display = "block";
            document.querySelector("#sign-up-link").style.display = "block";
          });
        }
        clearLikes() {
          let buttons = document.querySelectorAll(".unlike-button");
          buttons.forEach((each) => {
            each.remove();
          });
          let button = document.querySelectorAll(".like-button");
          button.forEach((each) => {
            each.remove();
          });
        }
        clearDeleteButtons() {
          let button = document.querySelectorAll(".delete-button");
          button.forEach((each) => each.remove());
        }
        async displayPeeps() {
          let peeps = await this.client.loadPeeps();
          console.log(peeps);
          peeps.forEach(async (element) => {
            let newPeep = document.createElement("div");
            newPeep.className = "peep";
            newPeep.innerHTML = `<p> @${element.user.handle} ${element.body}</p>
                          <p>Time: ${element.created_at}</p>
                          <p>Likes: ${element.likes.length}</p>`;
            document.querySelector("body").append(newPeep);
            let likeChecker = () => {
              let isLiked = false;
              element.likes.forEach((like) => {
                if (like.user.id === this.user.user_id) {
                  isLiked = true;
                } else {
                  isLiked = false;
                }
              });
              return isLiked;
            };
            if (this.user.session_key !== void 0) {
              if (likeChecker() === true) {
                this.displayUnlikePeep(element.id, newPeep);
              } else {
                this.displayLikePeep(element.id, newPeep);
              }
            }
            if (element.user.handle === this.user.handle) {
              this.deletePeepButton(element.id, newPeep);
            }
          });
        }
        deletePeepButton(peep_id, parentElement) {
          let deleteButton = document.createElement("BUTTON");
          deleteButton.className = "delete-button";
          deleteButton.innerHTML = "Delete";
          parentElement.append(deleteButton);
          let id = peep_id;
          deleteButton.addEventListener("click", async () => {
            await this.deletePeep(id);
            this.clearPeeps();
            this.displayPeeps();
          });
        }
        async likePeeps(id) {
          let session = this.user.session_key;
          let user2 = this.user.user_id;
          await this.client.likePeep(id, user2, session);
        }
        async unlikePeeps(id) {
          let session = this.user.session_key;
          let user2 = this.user.user_id;
          await this.client.unlikePeep(id, user2, session);
        }
        displayUnlikePeep(peep_id, parentElement) {
          let buttonElement = document.createElement("BUTTON");
          buttonElement.className = "unlike-button";
          buttonElement.innerHTML = "Unlike";
          parentElement.append(buttonElement);
          let id = peep_id;
          buttonElement.addEventListener("click", async () => {
            await this.unlikePeeps(id);
            this.clearPeeps();
            this.displayPeeps();
          });
        }
        displayLikePeep(peep_id, parentElement) {
          let buttonElement = document.createElement("BUTTON");
          buttonElement.className = "like-button";
          buttonElement.innerHTML = "Like";
          parentElement.append(buttonElement);
          let id = peep_id;
          buttonElement.addEventListener("click", async () => {
            await this.likePeeps(id);
            this.clearPeeps();
            this.displayPeeps();
          });
        }
        async writePeepDisplay() {
          let peepForm = document.createElement("input");
          let body = document.querySelector("body");
          peepForm.setAttribute("type", "text");
          peepForm.setAttribute("id", "peep-input");
          peepForm.setAttribute("placeholder", "240 Characters");
          body.append(peepForm);
          let peepButton = document.createElement("BUTTON");
          peepButton.setAttribute("id", "peep-button");
          peepButton.innerHTML = "Peep";
          body.append(peepButton);
          peepButton.addEventListener("click", async () => {
            await this.writePeep();
            this.clearDeleteButtons();
            this.clearPeeps();
            this.displayPeeps();
          });
        }
        clearPeeps() {
          let clearPeeps = document.querySelectorAll(".peep");
          clearPeeps.forEach((peep) => {
            peep.remove();
          });
        }
        async writePeep() {
          const peep = {
            user_id: this.user.user_id,
            body: document.querySelector("#peep-input").value
          };
          let session = this.user.session_key;
          await this.client.postPeep(peep, session);
        }
        async deletePeep(id) {
          let session = this.user.session_key;
          await this.client.deletePeep(id, session);
          await this.clearDeleteButtons();
        }
        logo() {
          let header = document.createElement("div");
          header.classList.add("header");
          let logoCenter = document.createElement("img");
          logoCenter.src = "logo-center.png";
          logoCenter.alt = "Center Logo";
          logoCenter.classList.add("logo-center");
          let logoRight = document.createElement("img");
          logoRight.src = "logo-right.png";
          logoRight.alt = "Right Logo";
          logoRight.classList.add("logo-right");
          header.append(logoCenter);
          header.append(logoRight);
          document.body.append(header);
        }
      };
      module.exports = chitterView2;
    }
  });

  // src/index.js
  var chitterClient = require_chitterClient();
  var User = require_userModel();
  var chitterView = require_chitterView();
  var client = new chitterClient();
  var user = new User();
  var view = new chitterView(client, user);
  view.displayLogin();
  view.logOutDisplay();
  view.signUpPage();
  view.displayPeeps();
  view.logo();
})();
