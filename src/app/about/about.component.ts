import { Component, OnInit } from '@angular/core';
import { LeaderService } from '../services/leader.service';
import { Leader} from '../shared/leader';
import { LEADERS } from '../shared/leaders';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
Leaders : Leader[] = LEADERS;
  constructor(private leaderservice: LeaderService) { }

  ngOnInit(): void {
    this.Leaders = this.leaderservice.getLeaders();
  }

}
