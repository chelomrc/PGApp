import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private baseUrl: string = environment.BASE_API_URL;
  public users: User[];
  public totalSubscribers: string;
  public stadistics: User[][];

  constructor(   
    private readonly _http: HttpClient
  ) { 
    this.getUsers().subscribe((users: any[]) => {
      this.users = users['users'];
      this.totalSubscribers = users['total'];      
    });
  }

  public addUser( user: User ) {
    return this._http.post(this.baseUrl + "/users", user)
  }

  public getUsers( desde: number = 0, limit: number = 0 ) {
    const url = `${ this.baseUrl }/users?limit=${limit}&desde=${ desde }`
    return this._http.get<User[]>( url );
  }

  public getUserById( id: string ){
    return this._http.get<User>( this.baseUrl + "/users/" + id );
  }

  public updateUser( user: User ) {
    return this._http.put(this.baseUrl + "/users/" + user.SubscriberID, user);
  }

  public deleteUser( id: string ) {    
    return this._http.delete(this.baseUrl + "/users/" + id);
  }

  public getStadistics() {
    this.stadistics = [ 
      this.users.filter( user => user.Status == "active"),
      this.users.filter( user => user.Status == "inactive"),
      this.users.filter( user => user.Status == "suspended"),
      this.users.filter( user => user.Status == "preactive"),      
    ];
    return this.stadistics;
  }

  getTopSubscribers() {
    const [ activeSubscribers ] = this.stadistics;
    return activeSubscribers.sort((a, b) => (+b.UsageBytes - +a.UsageBytes) ).slice(0,5);
  }

}
