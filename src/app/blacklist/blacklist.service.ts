import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import axios from "axios";
@Injectable({
    providedIn: 'root'
})
export class BlacklistService {

    async Blacklistlist() {
        return axios.post(`${environment.URL_API}/Blacklistlist`)
            .then(res => {
                return res
            })
            .catch(err => {
                return err
            })
    }

    async blacklistadd(data) {
        return await axios.post(`${environment.URL_API}/blacklistadd`, data)
            .then(res => {
                return res
            })
            .catch(err => {
                return err
            })
    }

    async blacklistdelete(data) {
        return axios.post(`${environment.URL_API}/blacklistdelete`, data).then(res => {
            return res
        }).catch(err => {
            return err
        })
    }

    async blacklist(data) {
        return await axios.post(`${environment.URL_API}/blacklist`, data)
            .then(res => {
                return res
            })
            .catch(err => {
                return err
            })
    }

    async Blacklistfiledelete(data) {
        return axios.post(`${environment.URL_API}/Blacklistfiledelete`, data).then(res => {
            return res
        }).catch(err => {
            return err
        })
    }

    async Blacklistfile(data) {
        await axios.post(`${environment.URL_API}/Blacklistfile`, data, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(res => {
                return res
            })
            .catch(err => {
                return err
            })
    }

    async Blacklistdownload(data) {
        return await axios.post(`${environment.URL_API}/Blacklistdownload`, data)
            .then(res => {
                return res
            })
            .catch(err => {
                return err
            })
    }
}