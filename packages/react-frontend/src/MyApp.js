import React, { useState, useEffect } from 'react';
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function postUser(person) {
    return fetch("http://localhost:8000/users", { // Ensure the URL is correct
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
  }

  function updateList(person) {
    postUser(person)
      .then(response => {
        if (response.status === 201) {
          return response.json(); // Parse the JSON of the response to get the newly created user object
        } else {
          throw new Error('User creation failed');
        }
      })
      .then(createdUser => {
        setCharacters([...characters, createdUser]); // Update the state with the new user, including its ID
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function removeOneCharacter(index) {
    const updated = characters.filter((character, i) => {
      return i !== index;
    });
    setCharacters(updated);
  }

  function fetchUsers() {
    return fetch("http://localhost:8000/users"); // 
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => { console.log(error); });
  }, []);

  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
