
import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import axios from "axios";
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Location } from '@angular/common';
@Injectable({
    providedIn: 'root'
})
export class authpaths implements CanActivate {

    status: number
    location: Location;
    constructor(location: Location, private router: Router) {
        this.location = location;
    }
    async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {

        let data = {
            "username": sessionStorage.getItem('user'),
            "url": route.routeConfig.path
        }
        if (sessionStorage.getItem('user') == null) {
            return false
        }
        await axios.post(`${environment.URL_API}/auth`, data)
            .then(res => {
                this.status = res.data.active
            })
            .catch(err => {
                throw err
            })
        console.log(this.status)
        if (this.status == 1) {
            return true
        } else {
            return false
        }
    }
}