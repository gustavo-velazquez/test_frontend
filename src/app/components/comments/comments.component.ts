import { Component, Input, OnInit } from '@angular/core';
import { comment } from 'src/app/models/comment.model';
import { PostService } from 'src/app/servervices/post.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() postId !: number;

  comments : comment[] = [];

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.getcomments();
  }

  getcomments(){
    this.postService.getComment(this.postId)
    .subscribe((response: comment[]) => this.comments = response )
  }

}
