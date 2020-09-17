import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, FormControl, Validators } from '@angular/forms';
import { MessageService } from '../message.service';
import { UserManService } from '../user-man.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private formBuild: FormBuilder, private userService: UserManService, private messageService: MessageService) { }

  formData: FormGroup = this.formBuild.group({
        fullname: new FormControl('', [
            Validators.required
        ]),
        email: new FormControl('', [
            Validators.required,
            Validators.email
        ]),
        password: new FormControl('', [
            Validators.required
        ])
    })
    ngOnInit(): void {
    }

    /* checkName(){}
    checkPassword(){}
    checkEmail(){} */

    onSubmit() {
        if(this.formData.controls.fullname.status != "VALID"){
            this.messageService.notify("Please provide a valid user name");
            return;
        }
        if(this.formData.controls.email.status != "VALID"){
            this.messageService.notify("Please enter a valid email address");
            return;
        }
        if(this.formData.controls.password.status != "VALID"){
            this.messageService.notify("Please fill in the password field");
            return;
        }
        this.userService.signup(this.formData.value).subscribe( res => {
            this.messageService.notify(res.message);
        });
    }
}
