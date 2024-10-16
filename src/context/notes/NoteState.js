import React from "react";
import noteContext from "./noteContext";
import { useState } from "react";

const NoteState =(props)=>
{  
    const initialNote = [
        {
          "_id": "670cda6bfe110b08e79d7fdc",
          "user": "670cc4564eada97b8829145d",
          "title": "my title",
          "description": "wake up early",
          "tag": "personal",
          "date": "2024-10-14T08:46:35.354Z",
          "__v": 0
        },
        {
          "_id": "670cdc41ff82490db9b22884",
          "user": "670cc4564eada97b8829145d",
          "title": "Music",
          "description": "Please access the playlist ",
          "tag": "Youtube",
          "date": "2024-10-14T08:54:25.583Z",
          "__v": 0
        },
        {
          "_id": "670cdc41ff82ff490db9b22884",
          "user": "670cc4564eada97b8829145d",
          "title": "Music",
          "description": "Please access the playlist ",
          "tag": "Youtube",
          "date": "2024-10-14T08:54:25.583Z",
          "__v": 0
        },
        {
          "_id": "670cdc41ff8qwe2490db9b22884",
          "user": "670cc4564eada97b8829145d",
          "title": "Music",
          "description": "Please access the playlist ",
          "tag": "Youtube",
          "date": "2024-10-14T08:54:25.583Z",
          "__v": 0
        },
        {
          "_id": "670cdc41ff8ew2490db9b22884",
          "user": "670cc4564eada97b8829145d",
          "title": "Music",
          "description": "Please access the playlist ",
          "tag": "Youtube",
          "date": "2024-10-14T08:54:25.583Z",
          "__v": 0
        },
        {
          "_id": "670cdc41ff824yy90db9b22884",
          "user": "670cc4564eada97b8829145d",
          "title": "Music",
          "description": "Please access the playlist ",
          "tag": "Youtube",
          "date": "2024-10-14T08:54:25.583Z",
          "__v": 0
        },
        {
          "_id": "670cdc41ff8249ss0db9b22884",
          "user": "670cc4564eada97b8829145d",
          "title": "Music",
          "description": "Please access the playlist ",
          "tag": "Youtube",
          "date": "2024-10-14T08:54:25.583Z",
          "__v": 0
        },
        {
          "_id": "670cdc41ff82490db9b2da2884",
          "user": "670cc4564eada97b8829145d",
          "title": "Music",
          "description": "Please access the playlist ",
          "tag": "Youtube",
          "date": "2024-10-14T08:54:25.583Z",
          "__v": 0
        }
      ]
    
    const [notes, setnotes] = useState(initialNote)

    //Add a note
    const addNote =(title,description,tag)=>{
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
    const deleteNote =()=>{

    }

    //Edit a note
    const editNote =()=>{

    }

    return(
    <noteContext.Provider value ={{notes,setnotes,addNote,deleteNote,editNote}}>
       {props.children}
    </noteContext.Provider>
    )
}

export default NoteState;