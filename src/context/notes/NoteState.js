import React from "react";
import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = process.env.REACT_APP_API_URL
  const initialNote = []

  const [notes, setnotes] = useState(initialNote)

  //Get All note
  const getNote = async (title, description, tag) => {
    //Api Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json()
    console.log(json);
    setnotes(json);
  }

  //Add a note
  const addNote = async (title, description, tag) => {
    //Api Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json()

    //Logic for client side
    if (Array.isArray(notes)) {
      setnotes([...notes, note]);
    } else {
      setnotes(notes.concat(note));
    }

    }

    //Delete a note
    const deleteNote = async (id) => {
      //Api call
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "Delete",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
      });
      const json = await response.json()
      console.log(json);

      console.log("Deleting a note" + id)
      const newNotes = notes.filter((note) => { return note._id !== id })
      setnotes(newNotes);
    }

    //Edit a note
    const editNote = async (id, title, description, tag) => {
      //TODO : call Api
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "Put",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag }),
      });
      const json = await response.json()
      console.log(json);


      //Logic for client side
      let newNotes = JSON.parse(JSON.stringify(notes))
      console.log("editing a note")
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if (element._id === id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }

      }
      setnotes(newNotes);
    }

    return (
      <noteContext.Provider value={{ notes, setnotes, addNote, deleteNote, editNote, getNote }}>
        {props.children}
      </noteContext.Provider>
    )
  }

  export default NoteState;