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
        }
      ]
    
    const [notes, setnotes] = useState(initialNote)

    return(
    <noteContext.Provider value ={{notes,setnotes}}>
       {props.children}
    </noteContext.Provider>
    )
}

export default NoteState;