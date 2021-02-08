import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { HttpService } from 'src/app/services/http.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-subscriber',
  templateUrl: './subscriber.component.html',
  styleUrls: ['./subscriber.component.css']
})
export class SubscriberComponent implements OnInit {

  public subscriberForm: FormGroup;
  public isNewSubscriber: boolean = false;

  constructor( 
    private _fb: FormBuilder,
    public _httpService: HttpService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params => {      
      params.id !== 'new' ? this.loadUserInfo(params.id) : this.setFormEmpty();
    })
  }

  loadUserInfo(id: string){
    this._httpService.getUserById(id).subscribe((res: any) => {
      const { user } = res;
      this.subscriberForm = this._fb.group({
        SubscriberID: [ user.SubscriberID, Validators.required],
        UsageBytes: [user.UsageBytes, Validators.required],
        Status: [user.Status, Validators.required],
      })
    }, (err) => { 
      Swal.fire({
        icon: 'error',
        title: err.error.msg,
      })
    })
  }

  setFormEmpty() {
    this.isNewSubscriber = true;
    this.subscriberForm = this._fb.group({
      SubscriberID: [ "", Validators.required],
      UsageBytes: ["", Validators.required],
      Status: ["", Validators.required],
    })
  }

  sendForm() {
    this.isNewSubscriber ? this.addUser() : this.updateUser();
  }

  addUser() {
    this._httpService.addUser(this.subscriberForm.value)
    .subscribe( resp => {
      Swal.fire({
        icon: 'success',
        title: 'User has been created',
      }).then(() => {
        this._httpService.getUsers();
        this._router.navigate(["/"]);
      })
    }, (err) => {
      Swal.fire({
        icon: 'error',
        title: err.error.msg,
      })
    });
  }

  updateUser() {
    this._httpService.updateUser(this.subscriberForm.value)
    .subscribe( resp => {
      Swal.fire({
        icon: 'success',
        title: 'User has been updated',
      }).then(() => {
        this._router.navigate(["/"]);
      })
    }, (err) => {
      Swal.fire({
        icon: 'error',
        title: err.error.msg,
      })
    });
  }

}
