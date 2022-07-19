import { EntryFieldsReducer, EntryState } from './entryfieldsReducer';
import { combineReducers } from "redux";
import {noteReducer, NoteState} from './notesReducer'

export interface AppState{
    notes: NoteState,
    entryfields: EntryState
}

export const rootReducer = combineReducers<AppState>({
    notes: noteReducer,
    entryfields: EntryFieldsReducer
  });