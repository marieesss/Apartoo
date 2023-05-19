import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { LocalStorageService } from '../local-storage.service';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  
 constructor(private formBuilder: FormBuilder, private service: DataService, private router: Router, private localStorage: LocalStorageService ) 
 {

  this.localStorage.removeItem('currentUser');
  this.router.navigate(['/inscription'])

 }

}
