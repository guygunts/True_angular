import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import axios from "axios";
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class notifymappingService {
    constructor(private http: HttpClient) {

    }

    async notifymappingslist() {

        return await axios.get(`/notifymappinglist`)
            .then(res => {

                for (let i = 0; i < res.data.data.length; i++) {
                    if (res.data.data[i].cus_type == 0) {
                        res.data.data[i].cus_type = 'Postpaid'
                    } else if (res.data.data[i].cus_type == 1) {
                        res.data.data[i].cus_type = 'Prepaid'
                    } else if (res.data.data[i].cus_type == 2) {
                        res.data.data[i].cus_type = 'All'
                    }
                    for (const [key, value] of Object.entries(res.data.data[i])) {
                        if (value == 'null') {
                            res.data.data[i][key] = ''
                        }
                    }
                }

                return res.data
            })
            .catch(err => {
                return err
            })
    }

    async notifymappinginsert(data) {
        return await axios.post(`/Notifymappinginsert`, data)
            .then(res => {
                return res.data
            })
            .catch(err => {
                return err
            })

    }

    async notifymappingedit(data) {
        return await axios.post(`/notifymappingedit`, data)
            .then(res => {
                return res.data
            })
            .catch(err => {
                return err
            })

    }

    async notifymappingdelete(data) {
        return await axios.post(`/Notifymappingdelete`, data)
            .then(res => {
                return res.data
            })
            .catch(err => {
                return err
            })

    }
}