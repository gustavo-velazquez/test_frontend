import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/servervices/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  public listPost: Post[] = [];
  public pageSize:number = 5;
  public starIndex:number = 0;
  public endIndex:number = 5;

  constructor(private post:PostService) { }

  ngOnInit(): void {
    this.getData();
  }

  public getData(){
    this.post.get().subscribe((response : Post[])=> {
      this.listPost = response;
    })
  }

  public onPageChange(event: PageEvent){
    this.starIndex = event.pageIndex * event.pageSize;
    this.endIndex = this.starIndex + event.pageSize;
   
  }

}
