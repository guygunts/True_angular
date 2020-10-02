import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import axios from "axios";
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class planoffersService {
    constructor(private http: HttpClient) {

    }

    async offerslist() {

        return await axios.get(`/offerlist`)
            .then(res => {

                for (let i = 0; i < res.data.data.length; i++) {
                    if (res.data.data[i].Payment_Type == 0) {
                        res.data.data[i].Payment_Type = 'Postpaid'
                    } else if (res.data.data[i].Payment_Type == 1) {
                        res.data.data[i].Payment_Type = 'Prepaid'
                    } else if (res.data.data[i].Payment_Type == 2) {
                        res.data.data[i].Payment_Type = 'All'
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

    async offerinsert(data) {
        return await axios.post(`/planofferinsert`, data)
            .then(res => {
                return res.data
            })
            .catch(err => {
                return err
            })

    }

    async offeredit(data) {
        return await axios.post(`/planofferedit`, data)
            .then(res => {
                return res.data
            })
            .catch(err => {
                return err
            })

    }

    async offerdelete(data) {
        return await axios.post(`/planofferdelete`, data)
            .then(res => {
                return res.data
            })
            .catch(err => {
                return err
            })

    }

    async offerinsertfile(data) {
        return await axios.post(`/offerinsertfile`, data)
            .then(res => {
                return res.data
            })
            .catch(err => {
                return err
            })

    }

    async offerdropdown(data) {
        if (data == 'Postpaid') {
            data = 0
        } else if (data == 'Prepaid') {
            data = 1
        } else if (data == 'All') {
            data = 2
        }
        let datajson = {
            "cus_type": data
        }
        return await axios.post(`/planofferdropdown`, datajson)
            .then(res => {
                return res.data
            })
            .catch(err => {
                return err
            })

    }
}