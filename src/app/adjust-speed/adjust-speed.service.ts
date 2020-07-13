import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import axios from "axios";
@Injectable({
    providedIn: 'root'
})
export class AdjustSpeedService {
    //    //http://192.168.38.201:4200
    constructor() { }

    async adjustspeed(data) {
        return await axios.post(`${environment.URL_API}/adjustspeed`, data)
            .then(res => {
                return res.data
            })
            .catch(err => {
                return err
            })
    }

    async uploadadjustspeed(data) {
        return await axios.post(`${environment.URL_API}/uploadadjustspeed`, data)
            .then(res => {
                return res.data
            })
            .catch(err => {
                return err
            })

    }
}