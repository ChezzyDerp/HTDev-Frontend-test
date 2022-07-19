import { SIGN, TZ } from './../actionTypes';
import { EntryActionT } from './../../types';
import { TEXT } from "../actionTypes"

export type EntryState = {
  text: string,
  sign: string,
  tz  : string
}



export const EntryFieldsReducer: (s: EntryState | undefined, a: EntryActionT) => EntryState = (
    s = {text:'', sign:'', tz:''},
    a
  ) => {
    switch (a.type) {
      case TEXT:
        return { ...s, text: a.payload };
      case SIGN:
        return { ...s, sign: a.payload };
      case TZ:
        return { ...s, tz: a.payload };  
      default:
        return s;
    }
  };