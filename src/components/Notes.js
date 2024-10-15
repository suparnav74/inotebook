import React, { useContext } from 'react'
import noteContext from "../context/notes/noteContext";
import NoteItem from './NoteItem';

const Notes = () => {
    const context = useContext(noteContext);
    const {notes,setnotes} =context;
  return (
    <div className='row my-3'>
       {notes.map((notes)=>{
            return <NoteItem note={notes}/>;
        })}
    </div>
  )
}

export default Notes
