import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import axios from "axios";
@Injectable({
    providedIn: 'root'
})
export class GeneratelicenseService {
    constructor() { }

    async license() {
        return axios.get(`${environment.URL_API}/license`)
            .then(res => {
                return res
            })
    }

    async updatestastus(data) {
        return axios.post(`${environment.URL_API}/updatestastus`, data)
            .then(res => {
                return res
            })
            .catch(err => {
                return err
            })
    }

    async updatelicense(data) {
        return await axios.post(`${environment.URL_API}/updatelicense`, data)
            .then(res => {
                return res
            })
            .catch(err => {
                return err
            })
    }

    async generatelicense(data) {
        return await axios.post(`${environment.URL_API}/generatelicense`, data)
            .then(res => {
                return res
            })
            .catch(err => {
                return err
            })
    }
}