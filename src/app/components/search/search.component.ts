import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { HttpService } from 'src/app/services/http.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  user: User;
  query: string;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _httpService: HttpService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params => {
      this.query = params['query'];
      this._httpService.getUserById(this.query).subscribe((res: User) => {
        this.user = res['user'];
      }, (err) => { 
        Swal.fire({
          icon: 'error',
          title: err.error.msg,
        })
      })
    })
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
          ).then(() => this._router.navigate(["/", id]));
        }, (err) => {
          Swal.fire({
            icon: 'error',
            title: err.error.msg,
          }).then(() => this._router.navigate(["/", id]));
        });
      }
    })
  }

}
