import { Component } from '@angular/core';
import { OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { LocalStorageService } from '../local-storage.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {

  user:any;
  role:string
  frmGroup: FormGroup;
  roles: string[];


  constructor(private formBuilder: FormBuilder, private service: DataService, private router: Router, private localStorage: LocalStorageService) {
    this.user = this.localStorage.getItem('currentUser')
    console.log(this.user)
    this.role = this.user.role

    this.frmGroup = this.formBuilder.group({
      role: ['', Validators.required],
    });
    this.roles = this.service.roles;
    
  }

  logout(){
    this.localStorage.setItem('currentUser', "");
    this.router.navigate(["/inscription"])
  }

  // Add pangolin When Submit Button Is Clicked
  Modifier() {
  if (this.frmGroup.valid) {
 
   console.log(this.frmGroup.value.role)
 
  const data = {
         role: this.frmGroup.value.role
  }
  this.service.Modifier(JSON.stringify(data), this.user._id ).subscribe((res:any) => {
   if(res.username){
     this.router.navigate(["/list-pangolin"])
   }else{
     null
   }
  });
  }
  }

}
