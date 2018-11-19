import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  friendid: any
  friend: User
  constructor(private activatedRoute: ActivatedRoute, private userService: UserService) {
  this.friendid = this.activatedRoute.snapshot.params['uid']
  this.userService.getUserById(this.friendid).valueChanges().subscribe(
    (data:User)=>{
      this.friend=data
    },
    (error)=>{
      console.log(error)
    }
  )
  }
  ngOnInit() {
  }

}
