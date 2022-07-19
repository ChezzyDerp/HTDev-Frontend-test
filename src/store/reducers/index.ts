import { combineReducers } from "redux";
import {noteReducer, NoteState} from './notesReducer'

export interface AppState{
    notes: NoteState
}

export const rootReducer = combineReducers<AppState>({
    notes: noteReducer
  });