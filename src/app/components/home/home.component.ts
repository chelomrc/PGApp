import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { HttpService } from 'src/app/services/http.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public users: User[];
  public totalSubscribers: number;
  public desde: number = 0;
  public limit: number = 10;
  public isLoading: boolean = true;

  constructor(
    public _httpService: HttpService,
    private _router: Router
  ) { }

  ngOnInit(): void {
   this.getUsers();
  }

  getUsers() {
    this._httpService.getUsers(this.desde, this.limit).subscribe((users: any[]) => {
      this.users = users['users'];
      this.totalSubscribers = users['total'];
      this._httpService.totalSubscribers = users['total'];
      this.isLoading = false;
    })       
  }

  changePage( value: number ) {
    this.desde += value;

    if( this.desde < 0 ){
      this.desde = 0;
    } else if( this.desde >= this.totalSubscribers ) {
      this.desde -= value;
    }    
     this.getUsers();
  }

  changeUserPerPage( limit: number ) {
    this.limit = limit;
    this.desde = 0;
    this.getUsers();
  }

  getUsersPerPage( limit: number ) {
    if( limit == 0 ){
      return "All";
    }
    return limit;
  }

  addUser() {
    this._router.navigate(["/subscriber", "new"]);
  }

  editUser( id: string ) {
    this._router.navigate(["/subscriber", id]);
  }

  deleteUser(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {

      if (result.isConfirmed) {
        this._httpService.deleteUser(id)
        .subscribe( resp => {
          Swal.fire(
            'Deleted!',
            'User has been deleted.',
            'success'
          ).then(() => this.getUsers());
        }, (err) => {
          Swal.fire({
            icon: 'error',
            title: err.error.msg,
          }).then(() => this.getUsers())
        });

      }
    })
  }
}
