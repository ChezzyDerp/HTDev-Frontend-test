import { Alert, Button, Grid, MenuItem, Snackbar, Stack, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { FC, useEffect, useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import { useDispatch, useSelector } from 'react-redux';
import { AddNote } from '../store/actions/AddNote';
import { NoteT } from '../types';
import { getRecordDate, getTimeZones } from '../api';
import { SIGN, TEXT, TZ } from '../store/actionTypes';
import { AppState } from '../store/reducers';
import useLocalStorage from "use-local-storage";

const CreateRecords: FC = () => {

    const [notes, setNotes] = useLocalStorage<NoteT[]>("notes", []);
    const [buttonIs, setButtonIs] = useState(false)

    const [snackSuccess, setSnackSuccess] = useState(false)
    const [snackError, setSnackError] = useState(false)

    const text:string = useSelector((state: AppState ) => state.entryfields.text)
    const sign:string = useSelector((state: AppState ) => localStorage.getItem('sign') ||  state.entryfields.sign) 
    const tz  :string = useSelector((state: AppState ) => localStorage.getItem('tz')   || state.entryfields.tz)   

    const dispatch = useDispatch()

    const [timeZones, setTimezones] = useState([{
        value:'Загрузка...',
        label:'Загрузка...',
    }])

    const sendNote = () =>{
        setButtonIs(true)

        if(tz && text && sign){

           if(sign.length <= 100){

            getRecordDate(tz).then((data) =>{
                let record = data.data
                let note: NoteT = {text, sign, tz, date: record}
    
                localStorage.setItem("sign", sign)
                localStorage.setItem("tz", tz)
                
                dispatch(AddNote(note))
    
    
                setNotes([...notes, note])
                setButtonIs(false)

                setSnackSuccess(true)
                
                return 0
            })
           }
        }
        setButtonIs(false)
        setSnackError(true)
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

            {/* Snack bars */}
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={snackError} autoHideDuration={6000} onClose={() => setSnackError(false)}>
                    <Alert onClose={() => setSnackError(false)} severity="error" sx={{ width: '100%' }}>
                       Не все поля заполненны!
                    </Alert>
                </Snackbar>
                <Snackbar open={snackSuccess} autoHideDuration={6000} onClose={() => setSnackSuccess(false)}>
                    <Alert onClose={() => setSnackSuccess(false)} severity="success" sx={{ width: '100%' }}>
                        Успешное добавление
                    </Alert>
                </Snackbar>
            </Stack>

            {/* Layout */}
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

            <Button variant="contained" disabled={buttonIs} onClick={sendNote} sx={{marginTop:'10px'}} endIcon={<SendIcon />}>
                Отправить
            </Button>

        </Box>
    
  )
}

export default CreateRecords