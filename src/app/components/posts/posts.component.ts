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
  public pageSize:number = 10;
  public starIndex:number = 0;
  public endIndex:number = 10;

  constructor(private postService:PostService) { }

  ngOnInit(): void {
    this.getData();
  }

  public getData():void{
    this.postService.getPosts().subscribe((response : Post[])=> {
      this.listPost = response;
    })
  }

  public onPageChange(event: PageEvent):void{
    this.starIndex = event.pageIndex * event.pageSize;
    this.endIndex = this.starIndex + event.pageSize;
   
  }

}
