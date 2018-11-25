import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestsService } from '../services/requests.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  friends: User[]
  query: string = ''
  user: User
  friendEmail: string = ''
  constructor(private userService: UserService, private authenticationService: AuthenticationService,
    private router: Router, private modalService: NgbModal, private requestsService: RequestsService) {
    this.userService.getUsers().valueChanges().subscribe(
      (data: User[])=>{
        this.friends = data
      },
      (error)=>{console.log(error)})

      this.authenticationService.getStatus().subscribe(
        (status)=>{
          this.userService.getUserById(status.uid).valueChanges().subscribe(
            (data: User)=>{
              this.user = data
              console.log(this.user)
            },
            (error)=>{
              console.log(error)
            }
          )
        },
        (error)=>{
          console.log(error)
        }
      )
   }

  ngOnInit() {
  }

  logOut(){
    this.authenticationService.logOut()
    .then(()=>{
      alert("Sesión cerrada")
      this.router.navigate(['login'])
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  getIconByStatus(status){
    let icon = ''
    switch(status){
      case 'Online':
        icon = 'logo_live_online.png'
        break
        case 'Offline':
          icon = 'logo_live_offline.png'
          break
        case 'Busy':
          icon = 'logo_live_busy.png'
          break
        case 'Away':
          icon = 'logo_live_away.png'
          break
        case 'AppearOffline':
          icon = 'logo_live_appear_offline.png'
          break
    }
    return icon
  }
  getActivated(){
    let users = 0
    if (this.friends) {
      for (let user of this.friends) {
          if (user.status=='Online' && user.uid!=this.user.uid) {
              users=users+1
          }
      }
    }
    return users
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

    }, (reason) => {

    });
  }

  sendRequest(){
    const request = {
      timestamp: Date.now(),
      receiver_email: this.friendEmail,
      sender: this.user.uid,
      status: 'pending'
    }
    this.requestsService.createRequest(request)
    .then(()=>{
      alert('Solicitud Enviada')
    })
    .catch((error)=>{
      alert('Hubo un error')
      console.log(error)
    })
  }
}
