import React from "react";
import noteContext from "./noteContext";
import { useState } from "react";

const NoteState =(props)=>
{  
    const host = "http://localhost:5000"
    const initialNote = []
    
    const [notes, setnotes] = useState(initialNote)

    //Get All note
    const getNote =async(title,description,tag)=>{
      //Api Call
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "Get",
        headers: {
          "Content-Type": "application/json",
          "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcwY2M0NTY0ZWFkYTk3Yjg4MjkxNDVkIn0sImlhdCI6MTcyODg5MDQ4OH0.EJXJbFli24n3u3hRKTtOxVhgB1oRkTC2Li6b3W6duWU"
        },
      });
      const json = await response.json()
      console.log(json);
      setnotes(json);
    } 

    //Add a note
    const addNote =async(title,description,tag)=>{
      //Api Call
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcwY2M0NTY0ZWFkYTk3Yjg4MjkxNDVkIn0sImlhdCI6MTcyODg5MDQ4OH0.EJXJbFli24n3u3hRKTtOxVhgB1oRkTC2Li6b3W6duWU"
        },
        body: JSON.stringify({title,description,tag}),
      });

      //Logic for client side
      console.log("Adding a new Note")
      const note ={
      "_id": "670cdc41ff8h490dhb9b2da2884",
      "user": "670cc4564eada97b8829145d",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2024-10-14T08:54:25.583Z",
      "__v": 0
    }
    setnotes(notes.concat(note));
    }

    //Delete a note
    const deleteNote =async(id)=>{
       //Api call
       const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "Delete",
        headers: {
          "Content-Type": "application/json",
          "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcwY2M0NTY0ZWFkYTk3Yjg4MjkxNDVkIn0sImlhdCI6MTcyODg5MDQ4OH0.EJXJbFli24n3u3hRKTtOxVhgB1oRkTC2Li6b3W6duWU"
        },
      });
      const json = await response.json()

       console.log("Deleting a note" + id)
       const newNotes = notes.filter((note)=>{return note._id!==id})
       setnotes(newNotes);
    }

    //Edit a note
    const editNote = async(id,title,description,tag)=>{
      //TODO : call Api
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcwY2M0NTY0ZWFkYTk3Yjg4MjkxNDVkIn0sImlhdCI6MTcyODg5MDQ4OH0.EJXJbFli24n3u3hRKTtOxVhgB1oRkTC2Li6b3W6duWU"
        },
        body: JSON.stringify({title,description,tag}),
      });
      const json = await response.json()

      //Logic for client side
      console.log("editing a note")
      for (let index = 0; index < notes.length; index++) {
        const element = notes[index];
        if (element._id === id) {
          element.title =title;
          element.description=description;
          element.tag=tag;
        }
        
      }

    }

    return(
    <noteContext.Provider value ={{notes,setnotes,addNote,deleteNote,editNote,getNote}}>
       {props.children}
    </noteContext.Provider>
    )
}

export default NoteState;