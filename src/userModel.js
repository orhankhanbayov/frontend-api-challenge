class User {
  constructor() {
    this.handle = undefined;
    this.user_id = undefined;
    this.session_key = undefined;
  }

  setUserInfo(handle, user_id, session_key) {
    this.handle = handle;
    this.user_id = user_id;
    this.session_key = session_key;
  }

  logOut() {
    this.handle = undefined;
    this.user_id = undefined;
    this.session_key = undefined;
  }

  loggedIn() {
    if (this.session_key === undefined) {
      return false;
    } else {
      return true;
    }
  }
}

module.exports = User;
