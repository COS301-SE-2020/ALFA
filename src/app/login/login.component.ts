import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formData : FormGroup;
  constructor(private fBuild: FormBuilder) { }

  ngOnInit(): void {
    this.formData= this.fBuild.group({
      userEmail:'',
      userPassword: ''
    })
  }

  onSubmit(formData: NgForm) {
    console.log(formData.value); 
  }

}
