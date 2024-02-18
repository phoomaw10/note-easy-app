import { useState } from "react";
import { auth, firestore } from "../libs/firebase";
import "../Styles/Home.css";
import { collection, addDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import NoteCard from "../Components/NoteCard";

function Home({ user }) {
  const [notes, setNotes] = useState([]);
  const [noteName, setNoteName] = useState("");
  const [noteDetail, setNoteDetail] = useState("");
  const [noteTags, setNoteTags] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editedNote, setEditedNote] = useState(null);
  const [noteHistory, setNoteHistory] = useState({});
  const [openHistoryNoteId, setOpenHistoryNoteId] = useState(null);
  const predefinedTags = ["Personal", "Work", "Study", "Health", "Ideas"];

  const handleEdit = (id) => {
    const selectedNote = notes.find((note) => note.id === id);
    console.log("Previous Note:", selectedNote);
    setNoteHistory({ ...noteHistory, [id]: selectedNote });
    setEditedNote(selectedNote);
    setIsEditOpen(id);
  };

  const handleDelete = (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (isConfirmed) {
      const updatedNotes = notes.filter((note) => note.id !== id);
      setNotes(updatedNotes);
      console.log("Note deleted successfully!");
    }
  };

  const handleHistory = (id) => {
    const previousNote = noteHistory[id];
    if (previousNote) {
      setEditedNote(previousNote);
      setOpenHistoryNoteId(id);
    }
  };

  const handleUpdate = () => {
    const index = notes.findIndex((note) => note.id === editedNote.id);
    const updatedNotes = [...notes];
    const currentTime = new Date().toISOString();

    editedNote.lastEditTime = currentTime;

    updatedNotes[index] = editedNote;
    setNotes(updatedNotes);
    setIsEditOpen(false);
    setEditedNote(null);
  };

  const filteredNotes = selectedTag
    ? notes.filter((note) => note.tags.includes(selectedTag))
    : notes;

  const addNote = () => {
    if (noteName.trim() !== "" && noteDetail.trim() !== "") {
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleString();
      const newNote = {
        id: uuidv4(),
        name: noteName,
        detail: noteDetail,
        tags: noteTags,
        createdAt: formattedDate,
      };
      setNotes([...notes, newNote]);
      setNoteName("");
      setNoteDetail("");
      setNoteTags("");
    }
  };

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleConfirm = async () => {
    addNote();
    toggleModal();
    if (noteName.trim() !== "" && noteDetail.trim() !== "") {
      addDoc(collection(firestore, "notes"), {
        note_name: noteName,
        note_tag: noteTags,
        note_detail: noteDetail,
      })
        .then(() => {
          console.log("data submitted");
        })
        .catch((error) => {
          console.log(error);
        });
      try {
        await firestore.collection("notes").add(addDoc);
        console.log("Note added successfully!");
        setNoteName("");
        setNoteDetail("");
        setNoteTags("");
      } catch (error) {
        console.error("Error adding note: ", error);
      }
    } else {
      console.log("Please fill in all fields!");
    }
  };

  const handleTagChange = (event) => {
    setSelectedTag(event.target.value);
  };

  const handleClose = () => {
    toggleModal();
  };

  return (
    <div className="home-container">
      <div className="title-container">
        <h1>Hello, Welcome to Note Easy👋🏻</h1>{" "}
        <button onClick={() => auth.signOut()} className="btn-signout">
          Sign Out
        </button>
        <h2>"{user.displayName}"</h2>
        <button onClick={toggleModal} className="btn-createnote">
          Create Note
        </button>
      </div>
      {modal && (
        <div className="modal">
          <div className="overlay"></div>
          <div className="modalcontent">
            <h2>Fill information for your note.</h2>
            <div className="fill-container">
              <div className="fill">
                <input
                  type="text"
                  placeholder="Note Name"
                  value={noteName}
                  onChange={(e) => setNoteName(e.target.value)}
                />
                <select
                  value={noteTags}
                  onChange={(e) => setNoteTags(e.target.value)}
                >
                  <option value="">Select a Tag</option>
                  {predefinedTags.map((tag, index) => (
                    <option key={index} value={tag}>
                      {tag}
                    </option>
                  ))}
                </select>
                <textarea
                  className="note-detail-textarea"
                  placeholder="Note Detail"
                  value={noteDetail}
                  onChange={(e) => {
                    if (e.target.value.length <= 100) {
                      setNoteDetail(e.target.value);
                    }
                  }}
                  rows={4}
                  cols={40}
                  maxLength={100}
                />
                <div className="btn-container">
                  <button onClick={handleClose} className="btn-cancel">
                    Close
                  </button>
                  <button onClick={handleConfirm} className="btn-confirm">
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="notes-container">
        <h2>Your Notes 📝</h2>
        <div className="sort-container">
          <select
            value={selectedTag}
            onChange={handleTagChange}
            className="tag-select"
          >
            <option value="">Sort By</option>
            {predefinedTags.map((tag, index) => (
              <option key={index} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="list-card">
        <div className="card-container">
          {filteredNotes.map((note, index) => (
            <NoteCard
              key={index}
              note={note}
              handleEdit={handleEdit}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
              handleHistory={handleHistory}
              setEditedNote={setEditedNote}
              setIsEditOpen={setIsEditOpen}
              setOpenHistoryNoteId={setOpenHistoryNoteId}
              isEditOpen={isEditOpen}
              editedNote={editedNote}
              openHistoryNoteId={openHistoryNoteId}
              predefinedTags={predefinedTags}
              user={user}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
