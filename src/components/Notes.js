import React, { useContext, useEffect, useRef } from 'react'
import noteContext from "../context/notes/noteContext";
import NoteItem from './NoteItem';
import AddNote from './AddNote';

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNote } = context;
  useEffect(() => {
    getNote()
  }, [])


  const updateNote = (note) => {
    console.log("update note")
    ref.current.click();
  }
  const ref = useRef(null)

  return (
    <>
      <AddNote />

      <button ref={ref} type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit title</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              ...
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <div className='row my-3' style={{ textAlign: "justify" }}>
        {notes.map((notes) => {
          return <NoteItem key={notes._id} updateNote={updateNote} note={notes} />;
        })}
      </div>
    </>
  )
}

export default Notes
