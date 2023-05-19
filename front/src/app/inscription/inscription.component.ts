import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {

  frmGroup: FormGroup;
  roles: string[];

 constructor(private formBuilder: FormBuilder, private service: DataService, private router: Router) { 
  this.frmGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    role: ['', Validators.required],
 
  });
  this.roles = this.service.roles;
 }


 // Add pangolin When Submit Button Is Clicked
 Inscription() {
 if (this.frmGroup.valid) {

  console.log(this.frmGroup.value.role)

 let data = {
        username: this.frmGroup.value.username,
        email: this.frmGroup.value.email,
        password: this.frmGroup.value.password,
        role: this.frmGroup.value.role
 }
 this.service.Inscription(data).subscribe((data:any) => {
  if(data.username){
    this.router.navigate(["/connexion"])
  }else{
    null
  }
 });
 }
 }

}
