import { Component } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  user:any;


  constructor(private localStorage: LocalStorageService) {
    this.user = this.localStorage.getItem('currentUser')
    
  }

}
