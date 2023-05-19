import { Component } from '@angular/core';
import { OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-liste-pangolins',
  templateUrl: './liste-pangolins.component.html',
  styleUrls: ['./liste-pangolins.component.css']
})
export class ListePangolinsComponent {

  Pangolins : any


  constructor(private service: DataService, private router: Router, private localStorage: LocalStorageService) {
  }
 
  ngOnInit() {
  this.getPangolins();
  }

  addFriend(friendId: string) {

    const currentUser = this.localStorage.getItem('currentUser');

    const personId= currentUser._id

    console.log(currentUser)

    this.service.addFriend(personId, friendId)
    .subscribe((data)=>{
      this.localStorage.setItem('currentUser', data);
    }
      
    );
  }




  // To Get List Of Pangolins
  getPangolins() {
    this.service
      .getPangolins()
      .subscribe((data) => {
        this.Pangolins = data;
        console.log(this.Pangolins);
      });
  }



}
