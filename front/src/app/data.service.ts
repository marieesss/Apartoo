import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  uriAuth = 'http://localhost:5000/auth';
  uri = 'http://localhost:5000/pangolins';
  urifriend = 'http://localhost:5000/friend';
  roles: string[] = ['Guerrier', 'Alchimiste', 'Sorcier', 'Espions', 'Enchanteur'];

  constructor(private http: HttpClient) { }


    // inscription
 Inscription(body:any) {
  return this.http.post(`${this.uriAuth}/register`, body);
  }

      // inscription
 Connexion(body:any) {
  return this.http.post(`${this.uriAuth}/login`, body);
  }

  addFriend(personId:string, friendId: string) {
    return this.http.put(`${this.urifriend}/${personId}/friends/${friendId}`, {});
    }

    Modifier(body:any, personId:string) {
      return this.http.put(`${this.uri}/updatepangolin/${personId}`, body);
      }


  getPangolins() {
    return this.http.get(`${this.uri}`);
    }

  DeleteFriend(personId:string, friendId: string){
    return this.http.delete(`${this.urifriend}/persons/${personId}/friends/${friendId}`);
  }

    getPangolinsInfo(personId:string) {
      return this.http.get(`${this.uri}/information/${personId}`);
      }
}
