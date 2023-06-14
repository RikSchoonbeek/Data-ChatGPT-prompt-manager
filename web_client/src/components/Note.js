import { useEffect, useState, useRef } from "react";

import { Editable, useEditor } from "@wysimark/react";

import { useNotes } from "../context/NotesContext";

// TODO I think the current autosave mechanism could break if the note
//  being provided changes, as a planned update call will use the data of
//  the new note, not the old one. I need to come up with a solution that
//  will make sure that the note being saved is the one that was being edited
//  when the timer was set. And when the note changes, a last save should be
//  triggered.
// TODO I think it would also be useful to have an indicator for unsaved changes.
const Note = ({ note }) => {
  const NOTE_AUTOSAVE_INTERVAL_MS = 20 * 1000;
  const [noteTitle, setNoteTitle] = useState(note.title);
  // InitialMarkdown seems necessary to set the content of the editor on first render,
  // the useEffect below doesn't seem to work for the first render
  const editor = useEditor({ initialMarkdown: note.content });
  const [changedContent, setChangedContent] = useState(note.content);
  // The order of the requests in the queue is significant. The request at the
  // end start the queue is the most recent one.
  const updateRequestQueue = useRef([]);
  const { createNote, updateNote } = useNotes();

  // Set initial content of editor when note changes
  useEffect(() => editor.resetMarkdown(note.content), [note.id]);

  // TODO I am thinking about another solution in which a queue is used.
  //    The queue will contain a maximum of two requests. Each pre-initiation save request
  //    gets a unique ID, and a status (pre-initiation, in-progress, maybe sucess an error)
  //    and as long as one request is pre-initiation a new one can't be started.
  //    But when a request is in-progress and new changes are made a new request
  //    is started for the new changes.
  //    When a request is finished, it's data is cleaed from the queue.

  // TODO distinguish between auto save calls and manual save calls
  //    validation errors returned by auto save calls should not be
  //    displayed to the user, but validation errors from manual
  //    save calls should.
  const handleSaveNote = () => {
    const noteData = {
      content: changedContent,
      title: noteTitle,
      ...(note.id !== undefined ? { id: note.id } : {}),
    };
    const saveFunc = note.id !== undefined ? updateNote : createNote;
    // TODO: remove request from queue.
    //  If manual save call and request has validation errors: show them to user.
    //  If manual save call and request has no validation errors: show success message.
    //  If auto save call and request has validation errors: do nothing.
    //  If auto save call and request fails for reason other than validation errors:
    //    show error message that auto save failed and that a retry will be attempted.
    //    And schedule a retry. (the data for current request should already be removed
    //    from the queue)
    saveFunc(noteData)
      .then((res) => {
        // TODO handle
      })
      .catch((err) => {
        // TODO handle
      });
  };

  const scheduleSaveNoteRequest = () => {
    // Schedule a save request to be executed after a delay and return an object
    // containing the timer ID and the status of the request.
    const requestTimerID = setTimeout(
      handleSaveNote,
      NOTE_AUTOSAVE_INTERVAL_MS
    );
    return {
      timerID: requestTimerID,
      status: "pre-initiation",
    };
  };

  const getLastRequestData = () => {
    // Return data for last request in queue, or null if queue is empty
    if (updateRequestQueue.current.length === 0) {
      return null;
    } else {
      return updateRequestQueue.current[updateRequestQueue.current.length - 1];
    }
  };

  // TODO I may have written this functionality assuming that the first response to
  //   return will be the first request in the queue, but I don't think that's
  //   guaranteed. I need to incorporate the request ID into the response, so that
  //   I can match the response to the request.
  // TODO I may need to think about how to deal with the situation in which requests
  //    take a long time to return a response. I envision that requests will queue
  //    up. I haven't yet thought about the consequences of this and it will probably
  //    be wise to do so if this app will be used seriously.
  useEffect(() => {
    // On change of the note a new save request can be scheduled.
    // If there is a pre-initiation save request, no new request will be started and nothing
    // will be done. If there is an in-progress request a new request will be started, as
    // the in-progress request will not have the latest changes.
    // After a request succeeds it will be removed from the request queue. If a request
    // fails, and no new request is pre-initiation, a new request will be scheduled.
    const lastRequestData = getLastRequestData();
    if (!lastRequestData) {
      // No request in queue, schedule a new one
      const requestData = scheduleSaveNoteRequest();
      updateRequestQueue.current.push(requestData);
    } else if (lastRequestData.status === "in-progress") {
      // There is an in-progress request, which doesn't have the latest changes,
      // schedule a new request
      const requestData = scheduleSaveNoteRequest();
      updateRequestQueue.current.push(requestData);
    }

    // Cleanup function
    return () => {
      // Clear all scheduled requests
      updateRequestQueue.current.forEarEach((requestData) => {
        clearTimeout(requestData.timerID);
      });
    };
  }, [changedContent, noteTitle]);

  // TODO make sure a save request is initiated on unmount

  return (
    <div className="note">
      <h1>{note.title}</h1>
      <Editable
        editor={editor}
        onChange={() => setChangedContent(editor.getMarkdown())}
      />
      <button onClick={handleSaveNote}>Save</button>
    </div>
  );
};

export default Note;
