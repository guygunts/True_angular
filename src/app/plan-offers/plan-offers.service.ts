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

                let columnname = [{
                    "header": "No",
                    "field": "no",
                    "style": {
                        "width": "6em"
                    }
                }]
                res.data.columnname.forEach(element => {
                    columnname.push(element)
                });
                res.data.columnname = columnname

                for (let i = 0; i < res.data.data.length; i++) {
                    res.data.data[i] = { ...res.data.data[i], "no": i };
                    if (res.data.data[i].Payment_Type == 0) {
                        res.data.data[i].Payment_Type = 'Postpaid'
                    } else if (res.data.data[i].Payment_Type == 1) {
                        res.data.data[i].Payment_Type = 'Prepaid'
                    } else if (res.data.data[i].Payment_Type == 2) {
                        res.data.data[i].Payment_Type = 'All'
                    }
                }
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

    async offerinsertfile(data) {
        return await axios.post(`${environment.URL_API}/offerinsertfile`, data)
            .then(res => {
                return res.data
            })
            .catch(err => {
                return err
            })

    }
}