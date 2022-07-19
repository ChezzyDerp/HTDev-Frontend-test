import axios from "axios"

const instance = axios.create({
    baseURL: 'https://worldtimeapi.org/api/timezone'
})

export const getTimeZones = () =>{
    return instance.get('')
}
export const getRecordDate = (timeZone: string) =>{
    return instance.get(`/${timeZone}`)
}