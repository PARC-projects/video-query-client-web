import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-collection-new',
  templateUrl: './video-collection-new.component.html',
  styleUrls: ['./video-collection-new.component.scss']
})
export class VideoCollectionNewComponent implements OnInit {
  public loading = false;
  constructor() { }

  ngOnInit(): void {
  }

}
