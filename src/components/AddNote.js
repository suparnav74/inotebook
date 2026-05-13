import React, { useContext, useState } from 'react'
import noteContext from "../context/notes/noteContext";

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setnote] = useState({ title: "", description: "", tag: "" })

  const handleClick = (e) => {
    e.preventDefault()
    addNote(note.title, note.description, note.tag)
    props.showAlert("Note Added Sucessfully", "success");
    setnote({ title: "", description: "", tag: "" })

  }

  const onChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value })
  }
  return (
    <div
      className="container-fluid"
      style={{
        height: "100vh",
        overflow: "hidden",
        backgroundImage: "url('/inotebookbg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        paddingTop: "120px",
        paddingBottom: "50px",
        textAlign: "left",
      }}
    >
      <div className="container">
        <div className="text-center mb-5">
          <h1
            style={{
              fontSize: "3rem",
              fontWeight: "700",
              color: "#111",
            }}
          >
            ✍🏻 Add A New Note:
          </h1>
        </div>

        <form style={{ maxWidth: "1100px", margin: "0 auto" }}>
          {/* TAG */}
          <div className="mb-4">
            <label
              htmlFor="tag"
              className="form-label"
              style={{
                fontSize: "2rem",
                fontWeight: "500",
              }}
            >
              Tag
            </label>

            <select
              className="form-select form-select-lg"
              id="tag"
              name="tag"
              value={note.tag}
              onChange={onChange}
              style={{
                height: "60px",
                borderRadius: "10px",
                fontSize: "1.4rem",
              }}
            >
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Important">Important</option>
              <option value="Academic">Academic</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* TITLE */}
          <div className="mb-4">
            <label
              htmlFor="title"
              className="form-label"
              style={{
                fontSize: "2rem",
                fontWeight: "500",
              }}
            >
              Title
            </label>

            <input
              type="text"
              className="form-control form-control-lg"
              id="title"
              name="title"
              value={note.title}
              onChange={onChange}
              minLength={5}
              required
              style={{
                height: "60px",
                borderRadius: "10px",
                fontSize: "1.3rem",
              }}
            />
          </div>

          {/* DESCRIPTION */}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="form-label"
              style={{
                fontSize: "2rem",
                fontWeight: "500",
              }}
            >
              Description
            </label>

            <textarea
              className="form-control form-control-lg"
              id="description"
              name="description"
              value={note.description}
              onChange={onChange}
              minLength={5}
              required
              rows="5"
              style={{
                borderRadius: "10px",
                fontSize: "1.3rem",
                resize: "none",
              }}
            ></textarea>
          </div>

          {/* BUTTON */}
          <div className="text-center mt-5">
            <button
              type="submit"
              disabled={
                note.title.length < 5 || note.description.length < 5
              }
              className="btn btn-primary px-5 py-3"
              onClick={handleClick}
              style={{
                borderRadius: "10px",
                fontSize: "1.5rem",
                fontWeight: "600",
              }}
            >
              Add Note
            </button>
          </div>

          {/* LINK */}
          <div className="text-center mt-4">
            <a
              href="/"
              className="text-primary text-decoration-none fw-semibold"
              style={{
                fontSize: "1.6rem",
              }}
            >
              View your notes &gt;
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddNote
