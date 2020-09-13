import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import axios from "axios";
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class errorcodeService {
    constructor(private http: HttpClient) {

    }

    async errorcodeslist() {

        return await axios.get(`${environment.URL_API}/errorcodelist`)
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

    async errorcodeinsert(data) {
        return await axios.post(`${environment.URL_API}/errorcodeinsert`, data)
            .then(res => {
                return res.data
            })
            .catch(err => {
                return err
            })

    }

    async errorcodeedit(data) {
        return await axios.post(`${environment.URL_API}/errorcodeedit`, data)
            .then(res => {
                return res.data
            })
            .catch(err => {
                return err
            })

    }

    async errorcodedelete(data) {
        return await axios.post(`${environment.URL_API}/errorcodedelete`, data)
            .then(res => {
                return res.data
            })
            .catch(err => {
                return err
            })

    }
}