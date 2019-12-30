import { Component, OnInit, Input } from '@angular/core';
import { Match } from 'src/app/models/match.model';
import { MatchService } from '../../match.service';

@Component({
  selector: 'app-match-video',
  templateUrl: './match-video.component.html',
  styleUrls: ['./match-video.component.scss']
})
export class MatchVideoComponent implements OnInit {
  @Input() match: Match;

  constructor(public matchService: MatchService) {
  }

  ngOnInit(): void {
  }
}
