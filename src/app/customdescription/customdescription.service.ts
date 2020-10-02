import { Injectable } from '@angular/core';
import axios from "axios";
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class customdescriptionService {
    constructor(private http: HttpClient) {

    }

    async customdescriptionlist(req) {
        return await axios.get(`/${req.table}`)
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

    async customdescriptionedit(data) {
        return await axios.post(`/errorcodeedit`, data)
            .then(res => {
                return res.data
            })
            .catch(err => {
                return err
            })

    }

}