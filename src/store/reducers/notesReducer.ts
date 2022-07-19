import { ADD_NOTE } from './../actionTypes';

import {NoteT, NoteActionT} from '../../types'

export type NoteState = {
    notes: Array<NoteT>
}


export const noteReducer: (s: NoteState | undefined, a: NoteActionT) => NoteState = (
    s = { notes: [] },
    a
  ) => {
    switch (a.type) {
      case ADD_NOTE:
        return { notes: [...s.notes, a.payload] };
      default:
        return s;
    }
  };