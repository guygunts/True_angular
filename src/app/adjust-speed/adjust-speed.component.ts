import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from './../service/authentication.service';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-adjust-speed',
  inputs: ['name'],
  templateUrl: './adjust-speed.component.html',
  styleUrls: ['./adjust-speed.component.scss']
})
export class AdjustSpeedComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  con = true
  datafromfile = []

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {

  }


  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      type: ['CPID'],
      CPID: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(250)])],
      MSISDN: ['66'],
      expirationTime: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.minLength(4), Validators.max(1440)])],
      maxMediaRateKbps: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.max(1440)])],
      cpidState: ['None']
    });
    console.log(this.loginForm.value.type)
  }

  counter(i: number) {
    return new Array(i).map(x => i + 1);
  }
  get f() { return this.loginForm.controls; }

  changedata(): void {
    if (this.loginForm.value.type == 'CPID') {
      this.con = true
    } else {
      this.con = false
    }

  }
  onSubmit() {

  }
  uploadfile() {
    console.log(JSON.stringify(this.datafromfile))
  }
  changeListener(files: FileList) {
    console.log(files);
    if (files && files.length > 0) {
      let file: File = files.item(0);
      let reader: FileReader = new FileReader();
      reader.readAsText(file);
      this.datafromfile = []
      reader.onload = (e) => {
        let csv: string = reader.result as string;
        this.datafromfile.push(csv)
      }
    }
  }
}