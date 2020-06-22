import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Ais Civr';
  user = '';
  profileForm = new FormGroup({
    Username: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private router: Router) { }




  summit() {
    //  this.router.navigate(['/menu'])
    sessionStorage.setItem('user', this.profileForm.value.Username);
    console.log(this.profileForm.value)
    this.user = sessionStorage.getItem('user');
  }
}
