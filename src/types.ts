import { ADD_NOTE } from './store/actionTypes';

enum TypesNoteAction{
    ADD_NOTE = 'ADD_NOTE'
}

export type RecordT = {
    abbreviation : string,
    client_ip    : string,
    datetime     : string,
    day_of_week  : number,
    day_of_year  : number,
    dst          : boolean,
    dst_from     : boolean,
    dst_offset   : number,
    raw_offset   : number,
    timezone     : string,
    unixtime     : number,
    utc_datetime : string,
    utc_offset   : string,
    week_number  : number
}

export type NoteT ={
    text : string,
    sign : string,
    tz   : string,
    date : RecordT
}

export type NoteActionT = {
    type: TypesNoteAction,
    payload: NoteT
}
export enum EntryTypes {
    TEXT = "TEXT",
    SIGN = "SIGN",
    TZ   = "TZ"
}
export type EntryActionT = {
    type   : EntryTypes,
    payload: string
}