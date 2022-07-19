import {Card,CardContent, CircularProgress, Grid, Pagination, Typography } from '@mui/material'
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { NoteT } from '../types'
import useLocalStorage from "use-local-storage";

const Records: FC<string> = () => {
  const [notes, setNotes] = useLocalStorage("notes", []);
  const per_page = 6
  const [indexPaginator, setIndexPaginator] = useState(1)
  //paginated notes
  const getNotesPage = useMemo(() =>{
    
    let begin = (indexPaginator - 1) * per_page
    let end = begin + per_page
    console.log(notes.slice(begin,end))
    console.log(begin, end)
    return notes.slice(begin,end)

  }, [indexPaginator])

  return (
    <>
       <Grid container sx={{ flexGrow: 1 }} spacing={3} flex-wrap>
          
          {getNotesPage.map((note: NoteT, index) =>{

            return (
              <Grid key={index} item xs={4}>
                <Card sx={{minWidth:'300px', width:'100%'}}>
                  <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      {note.sign}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {note.date.utc_datetime}
                    </Typography>
                    <Typography variant="body2">
                      {note.text}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            )
          })}
        
       </Grid>
       <Pagination onChange={(e, p) => setIndexPaginator(p)} count={Math.ceil(notes.length / per_page)} />
    
    </>
  )
}

export default Records