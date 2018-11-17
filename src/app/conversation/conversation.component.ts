import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  friendid: any
  constructor(private activatedRoute: ActivatedRoute) {
    this.friendid = this.activatedRoute.snapshot.params['uid']
    console.log(this.friendid)
  }
  ngOnInit() {
  }

}
