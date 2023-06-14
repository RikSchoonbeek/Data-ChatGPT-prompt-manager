import React, { createContext, useContext } from "react";
import useNotesHook from "../hooks/useNotes";

const NotesContext = createContext();

const NotesProvider = ({ children }) => {
  const notes = useNotesHook();

  return (
    <NotesContext.Provider value={notes}>{children}</NotesContext.Provider>
  );
};

const useNotes = () => useContext(NotesContext);

export { NotesProvider, useNotes };
