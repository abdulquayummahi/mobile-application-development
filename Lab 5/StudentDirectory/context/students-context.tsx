import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from "react";
import { STUDENTS } from "../data/students";
import {
  StudentsAction,
  StudentsState,
  studentsReducer,
} from "./students-reducer";

interface StudentsContextValue {
  students: StudentsState;
  dispatch: Dispatch<StudentsAction>;
}

interface StudentsProviderProps {
  children: ReactNode;
}

const StudentsContext = createContext<StudentsContextValue | null>(null);

export function StudentsProvider({ children }: StudentsProviderProps) {
  const [students, dispatch] = useReducer(studentsReducer, STUDENTS);

  return (
    <StudentsContext.Provider value={{ students, dispatch }}>
      {children}
    </StudentsContext.Provider>
  );
}

export function useStudents(): StudentsContextValue {
  const ctx = useContext(StudentsContext);

  if (!ctx) {
    throw new Error("useStudents must be used inside a StudentsProvider");
  }

  return ctx;
}
