import React from 'react';

function NoteCard({ note, setEditedNote, setIsEditOpen, setOpenHistoryNoteId,handleUpdate, handleEdit, handleDelete, handleHistory, isEditOpen, editedNote, openHistoryNoteId, predefinedTags, user }) {
  return (
    <div className="card">
      <h3>{note.name}</h3>
      <p>{note.tags}</p>
      <p>{note.detail}</p>
      <p>{user.displayName}</p>
      <p>Create At : {note.createdAt}</p>
      {note.lastEditTime && (
        <p>Last edited: {new Date(note.lastEditTime).toLocaleString()}</p>
      )}
      <div className="card-buttons">
        <button onClick={() => handleEdit(note.id)} className="edit-button">
          Edit
        </button>
        {isEditOpen === note.id && (
          <div className="edit-form">
            <h2>Edit Note</h2>
            <input
              type="text"
              placeholder="Note Name"
              value={editedNote.name}
              onChange={(e) =>
                setEditedNote({ ...editedNote, name: e.target.value })
              }
            />
            <textarea
              className="note-detail-textarea"
              placeholder="Note Detail"
              value={editedNote.detail}
              onChange={(e) =>
                setEditedNote({ ...editedNote, detail: e.target.value })
              }
              rows={4}
              cols={40}
              maxLength={100}
            />
            <select
              value={editedNote.tags}
              onChange={(e) =>
                setEditedNote({ ...editedNote, tags: e.target.value })
              }
            >
              <option value="">Select a Tag</option>
              {predefinedTags.map((tag, index) => (
                <option key={index} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
            <div className="btn-container">
              <button
                onClick={() => setIsEditOpen(null)}
                className="btn-cancel"
              >
                Cancel
              </button>
              <button onClick={handleUpdate} className="btn-confirm">
                Update
              </button>
            </div>
          </div>
        )}
        <button onClick={() => handleDelete(note.id)} className="delete-button">
          Delete
        </button>
        <button onClick={() => handleHistory(note.id)} className="history-button">
          History
        </button>
        {openHistoryNoteId === note.id && (
          <div className="history-modal">
            <div className="modal-content">
              <h2>Previous Details</h2>
              <p>Note Name: {editedNote.name}</p>
              <p>Note Detail: {editedNote.detail}</p>
              <p>Tags: {editedNote.tags}</p>
              <button onClick={() => setOpenHistoryNoteId(null)}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NoteCard;
