import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/servervices/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  post!: Post;
  dateComment: string ='';

  constructor(private activeRoute: ActivatedRoute, private postService: PostService) {
   }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.getPost(params['id'])
    })
  }

  getPost(id: number){
    this.postService.getPost(id)
    .subscribe((response : Post) => {this.post = response} )

  }

  getDate(date: string){
    this.dateComment = date;
  }

}
