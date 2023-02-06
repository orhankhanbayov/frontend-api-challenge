class chitterClient {
  async createUser(details) {
    try {
      let response = await fetch(
        "https://chitter-backend-api-v2.herokuapp.com/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user: details }),
        }
      );
      if (!response.ok) {
        throw new Error("That handle is already taken, please try again.");
      }
      if (response.ok) {
        throw new Error("You have signed up to Chitter");
      }

      let json = await response.json();
      return json;
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }
  async sessions(session) {
    try {
      let response = await fetch(
        "https://chitter-backend-api-v2.herokuapp.com/sessions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ session: session }),
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
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ peep }),
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
          "Content-Type": "application/json",
        },
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
          Authorization: `Token token=${session}`,
        },
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
          Authorization: `Token token=${session}`,
        },
      }
    );
    return response;
  }
}

module.exports = chitterClient;
