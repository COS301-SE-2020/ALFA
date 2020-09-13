import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private formBuild: FormBuilder) { }

  formData:FormGroup;
  ngOnInit(): void {

    this.formData = this.formBuild.group({

    })
  }

  checkName(){}
  checkPassword(){}
  checkEmail(){}
  
  onSubmit(formData: NgForm) {
    console.log(formData.value); 
  }


}
