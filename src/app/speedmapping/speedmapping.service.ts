import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import axios from "axios";
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class speedmapingService {
    constructor(private http: HttpClient) {

    }

    async maxrategetdata(req) {
        return await axios.get(`${environment.URL_API}/getmaxrate?id=${req.id}`)
            .then(res => {
                return res.data
            })
            .catch(err => {
                return err
            })

    }

    async maxratelist() {

        return await axios.get(`${environment.URL_API}/maxratelist`)
            .then(res => {
                return res.data
            })
            .catch(err => {
                return err
            })
    }

    async maxrateinsert(data) {
        return await axios.post(`${environment.URL_API}/maxrateinsert`, data)
            .then(res => {
                return res.data
            })
            .catch(err => {
                return err
            })

    }

    async maxrateedit(data) {
        return await axios.post(`${environment.URL_API}/maxrateedit`, data)
            .then(res => {
                return res.data
            })
            .catch(err => {
                return err
            })

    }

    async maxratedelete(data) {
        return await axios.post(`${environment.URL_API}/maxratedelete`, data)
            .then(res => {
                return res.data
            })
            .catch(err => {
                return err
            })

    }
}