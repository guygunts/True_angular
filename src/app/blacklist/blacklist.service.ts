import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import axios from "axios";
@Injectable({
    providedIn: 'root'
})
export class BlacklistService {

    async Blacklistlist() {
        return axios.post(`/Blacklistlist`)
            .then(res => {
                return res
            })
            .catch(err => {
                return err
            })
    }

    async blacklistadd(data) {
        return await axios.post(`/blacklistadd`, data)
            .then(res => {
                return res
            })
            .catch(err => {
                return err
            })
    }

    async blacklistdelete(data) {
        return axios.post(`/blacklistdelete`, data).then(res => {
            return res
        }).catch(err => {
            return err
        })
    }

    async blacklist(data) {
        return await axios.post(`/blacklist`, data)
            .then(res => {
                return res
            })
            .catch(err => {
                return err
            })
    }

    async Blacklistfiledelete(data) {
        return axios.post(`/Blacklistfiledelete`, data).then(res => {
            return res
        }).catch(err => {
            return err
        })
    }

    async Blacklistfile(data) {
        await axios.post(`/Blacklistfile`, data, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(res => {
                return res
            })
            .catch(err => {
                return err
            })
    }

    async Blacklistdownload(data) {
        return await axios.post(`/Blacklistdownload`, data)
            .then(res => {
                return res
            })
            .catch(err => {
                return err
            })
    }
}