import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from "../context/notes/noteContext";
import NoteItem from './NoteItem';
import AddNote from './AddNote';

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNote, editNote } = context;
  useEffect(() => {
    getNote()
  }, [])

 const {showAlert}=props;
  const updateNote = (currentNote) => {
    console.log("update note")
    ref.current.click();
    setnote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
  }
  const ref = useRef(null)
  const refClose = useRef(null)

  const [note, setnote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

  const onChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value })
  }

  const handleClick = (e) => {
    console.log("NOte Updating", note)
    editNote(note.id, note.etitle, note.edescription, note.etag)
    showAlert("Note Updated Successfully","success")
    refClose.current.click();

  }
  return (
    <>
      <AddNote showAlert={showAlert} />

      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header d-flex">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body" style={{ textAlign: "left" }}>
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle" name='etitle' value={note.etitle}
                    aria-describedby="emailHelp" onChange={onChange} minLength={5} required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control" value={note.edescription}
                    id="edescription" name='edescription' onChange={onChange} minLength={5} required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control" value={note.etag}
                    id="etag" name='etag' onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" onClick={handleClick} disabled={note.etitle.length<5||note.edescription.length<5} className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-3" style={{ textAlign: "left" }}>
        <h2>Your Notes</h2>
        {notes.length === 0 && "No notes to display"}
      </div>
      <div className='row my-3' style={{ textAlign: "justify" }}>

        {notes.map((notes) => {
          return <NoteItem key={notes._id} updateNote={updateNote} showAlert={showAlert} note={notes} />;
        })}
      </div>
    </>
  )
}

export default Notes
