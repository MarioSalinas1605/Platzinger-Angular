import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  friends: User[]
  query: string = ''
  user: User
  constructor(private userService: UserService, private authenticationService: AuthenticationService, private router: Router) {
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
    for (let user of this.friends) {
        if (user.status=='Online' && user.uid!=this.user.uid) {
            users=users+1
        }
    }
    return users
  }
}
