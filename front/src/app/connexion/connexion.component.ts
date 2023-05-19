import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { LocalStorageService } from '../local-storage.service';


@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {

  frmGroup: FormGroup;
  roles: string[];

 constructor(private formBuilder: FormBuilder, private service: DataService, private router: Router, private localStorage: LocalStorageService) { 
  this.frmGroup = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
 
  });
  this.roles = this.service.roles;
 }

 

 // Connexion
 Connexion() {
 if (this.frmGroup.valid) {

  console.log(this.frmGroup.value.role)

 let data = {
        email: this.frmGroup.value.email,
        password: this.frmGroup.value.password,
 }
 this.service.Connexion(data).subscribe((data:any) => {
  if(data.username){
    console.log(data)
    this.localStorage.setItem('currentUser', data);
    this.router.navigate(["/list-pangolin"])
  }else{
    null
  }
 });
 }
 }

}
