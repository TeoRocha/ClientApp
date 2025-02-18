import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { user } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private path = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getAllUsers(): Observable<any> {
    return this.httpClient.get<any[]>(this.path + "/Users/GetUsers");
  }

  editUser(user: user): any {
    const header = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.put(this.path + "/Users/Put", JSON.stringify(user), {headers: header});
  }

  createUser(user: user): any {
    const header = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post(this.path + "/Users/Post", JSON.stringify(user), {headers: header});
  }

  deleteUser(user: user): any {
    return this.httpClient.delete(this.path + "/Users/Delete/" + user.userId);
  }

  getImage(): any {
    return this.httpClient.get<any>(this.path + "/Users/Image", {responseType: 'text' as 'json'});
  }
}
