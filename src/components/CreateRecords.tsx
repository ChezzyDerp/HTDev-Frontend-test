import { Button, Grid, MenuItem, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import { useDispatch, useSelector } from 'react-redux';
import { AddNote } from '../store/actions/AddNote';
import { NoteT } from '../types';
import { getRecordDate, getTimeZones } from '../api';
import { EntryState } from '../store/reducers/entryfieldsReducer';
import { SIGN, TEXT, TZ } from '../store/actionTypes';





const CreateRecords = () => {

    const text = useSelector((state: EntryState ) => state.text)
    const sign = useSelector((state: EntryState ) => state.sign)
    const tz = useSelector((state: EntryState ) => state.tz)

    const dispatch = useDispatch()

    const [timeZones, setTimezones] = useState([{
        value:'Загрузка...',
        label:'Загрузка...',
    }])

    const sendNote = () =>{
        getRecordDate(tz).then((data) =>{
           let record = data.data
           let note: NoteT = {text, sign, tz, date: record}
           dispatch(AddNote(note))
        })
    }
    const handleValue = (payload, type) =>{
        dispatch({payload, type})
    }

    useEffect(() =>{
        getTimeZones().then((data) =>{
            let dataModify = data.data.map((val) =>{
                return {
                    label: val,
                    value: val
                }
            })
            setTimezones(dataModify)
        })
    }, [0])

    return (
        
        <Box sx={{ display:'flex', flexDirection:'column', alignItems:'flex-end'}}>
            <Grid container sx={{margin:"10px 0"}}>

                <Grid item xs>
                    <TextField
                        id="outlined-multiline-static"
                        label="Создать запись"
                        multiline
                        value={text}
                        onChange={(e) => handleValue(e.target.value, TEXT)}
                        rows={4}
                        sx={{width:'100%'}}
                    />
                </Grid>

            </Grid>

            <Grid container spacing={1}>

                <Grid item xs={9}>
                    <TextField
                        id="outlined-multiline-static"
                        label="Подпись"
                        onChange={(e) => handleValue(e.target.value, SIGN)}
                        value={sign}
                        sx={{width:'100%'}}
                    />
                </Grid>
                <Grid item xs>
                    <TextField
                        sx={{width:'100%'}}
                        id="outlined-select-currency"
                        select
                        value={tz}
                        label="Точное время"
                        onChange={(e) => handleValue(e.target.value, TZ)}
                    >
                        {timeZones.map((option) => (
                            <MenuItem disabled={option.value == 'Загрузка...'} key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                

            </Grid>

            <Button variant="contained" onClick={sendNote} sx={{marginTop:'10px'}} endIcon={<SendIcon />}>
                Отправить
            </Button>

        </Box>
    
  )
}

export default CreateRecords