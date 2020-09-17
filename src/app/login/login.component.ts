import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, FormControl, Validators } from '@angular/forms';
import { MessageService } from '../message.service';
import { UserManService } from '../user-man.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    formData : FormGroup = this.formBuild.group({
        email: new FormControl('', [
            Validators.required,
            Validators.email
        ]),
        password: new FormControl('', [
            Validators.required
        ])
    });
    constructor(private formBuild: FormBuilder, private userService: UserManService, private messageService: MessageService) { }

    ngOnInit(): void {
    }

    onSubmit() {
        if(this.formData.controls.email.status != "VALID"){
            this.messageService.notify("Please provide a valid email address");
            return;
        }
        if(this.formData.controls.password.status != "VALID"){
            this.messageService.notify("Please fill in the password field");
            return;
        }
        this.userService.signin(this.formData.value).subscribe( res => {
            this.messageService.notify(res.message);
        })
    }
}
