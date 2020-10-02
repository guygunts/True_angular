import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import axios from "axios";
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class UsermanagementService {
    constructor(private http: HttpClient) {

    }


    async usermanagementgetdata(req) {
        return await axios.get(`/getuser/?user_id=${req.user_id}`)
            .then(res => {
                return res.data
            })
            .catch(err => {
                return err
            })

    }

    async usermanagementlist() {
        return await axios.get(`/userlist`)
            .then(res => {
                return res.data
            })
            .catch(err => {
                return err
            })

    }

    async usermanagementinsert(data) {
        return await axios.post(`/userinsert`, data)
            .then(res => {
                return res.data
            })
            .catch(err => {
                return err
            })

    }

    async usermanagementedit(data) {
        return await axios.post(`/useredit`, data)
            .then(res => {
                return res.data
            })
            .catch(err => {
                return err
            })

    }

    async usermanagementdelete(data) {
        return await axios.post(`/userdelete`, data)
            .then(res => {
                return res.data
            })
            .catch(err => {
                return err
            })

    }
}