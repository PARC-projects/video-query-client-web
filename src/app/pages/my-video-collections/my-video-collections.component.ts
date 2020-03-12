import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-video-collections',
  templateUrl: './my-video-collections.component.html',
  styleUrls: ['./my-video-collections.component.scss']
})
export class MyVideoCollectionsComponent implements OnInit {
  public searchTerm: string;
  public openCreateNewQueryModal = false;

  constructor() { }

  ngOnInit(): void {
  }

  onSearch($event) {

  }
}
