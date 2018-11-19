import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { ConversationService } from '../services/conversation.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  friendid: any
  friend: User
  user: User
  conversation_id: string
  textMessage: string
  constructor(private activatedRoute: ActivatedRoute, private userService: UserService
    , private conversationService: ConversationService, private authenticationService: AuthenticationService){
  this.friendid = this.activatedRoute.snapshot.params['uid']
  this.userService.getUserById(this.friendid).valueChanges().subscribe(
    (data:User)=>{
      this.friend=data
      this.authenticationService.getStatus().subscribe(
        (session)=>{
          this.userService.getUserById(session.uid).valueChanges().subscribe(
            (user: User)=>{
              this.user = user
              const ids = [this.user.uid, this.friend.uid].sort()
              this.conversation_id = ids.join('|')
            }
          )
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

  sendMessage(){
    const message ={
      uid: this.conversation_id,
      timestamp: Date.now(),
      text: this.textMessage,
      sender: this.user.uid,
      receiver: this.friend.uid
    }
    this.conversationService.createConversation(message).then(
      ()=>{
        this.textMessage=''
      }
    )
  }
}
