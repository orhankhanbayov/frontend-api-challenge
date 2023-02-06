//popup form for sign up
//login throw proper error in client side
//tests

class chitterView {
  constructor(client, user) {
    this.client = client;
    this.user = user;
  }

  signUpPage() {
    let newButton = document.createElement("BUTTON");
    newButton.id = "sign-up-link";
    newButton.innerText = "Sign Up";
    document.querySelector("body").append(newButton);
    newButton.addEventListener("click", () => {
      this.signUp();
    });
  }

  async signUp() {
    let username = document.querySelector("#login-handle").value;
    let pass = document.querySelector("#login-password").value;
    let details = { handle: username, password: pass };
    let response = await this.client.createUser(details);
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
    this.user.setUserInfo(undefined, undefined, undefined);
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

      if (this.user.session_key !== undefined) {
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
    let user = this.user.user_id;
    await this.client.likePeep(id, user, session);
  }

  async unlikePeeps(id) {
    let session = this.user.session_key;
    let user = this.user.user_id;
    await this.client.unlikePeep(id, user, session);
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
      body: document.querySelector("#peep-input").value,
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
}

module.exports = chitterView;
