import { ADD_NOTE } from './../actionTypes';
import { NoteT } from './../../types';

export const AddNote = (n: NoteT) =>{
    return {type: ADD_NOTE, payload: n}
}