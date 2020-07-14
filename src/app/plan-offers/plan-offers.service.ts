import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import axios from "axios";
@Injectable({
    providedIn: 'root'
})
export class planoffersService {
    //    //http://192.168.38.201:4200
    constructor() { }

    async offerslist() {
        return await axios.post(`${environment.URL_API}/planofferlist`)
            .then(res => {
                return res.data
            })
            .catch(err => {
                return err
            })
    }

    async offerinsert(data) {
        return await axios.post(`${environment.URL_API}/planofferinsert`, data)
            .then(res => {
                return res.data
            })
            .catch(err => {
                return err
            })

    }

    async offeredit(data) {
        return await axios.post(`${environment.URL_API}/planofferedit`, data)
            .then(res => {
                return res.data
            })
            .catch(err => {
                return err
            })

    }

    async offerdelete(data) {
        return await axios.post(`${environment.URL_API}/planofferdelete`, data)
            .then(res => {
                return res.data
            })
            .catch(err => {
                return err
            })

    }
}