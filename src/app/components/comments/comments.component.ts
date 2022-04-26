import { Component, Input, OnInit, Output } from '@angular/core';
import { Comment } from 'src/app/models/comment.model';
import { PostService } from 'src/app/servervices/post.service';
import { EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() postId !: number;
  @Output() dateComments = new EventEmitter(); 

date !: Date;

  comments : Comment[] = [];
  lastComment!: Comment ;

  constructor(private postService: PostService) {
    
   }

  ngOnInit(): void {
    this.getcomments();
  }

  getcomments(){
    this.postService.getComment(this.postId)
    .subscribe((response: Comment[]) => {
    this.comments = response;
    this.getCommentLocalStorage(); });
  }

  saveComment(){
    this.lastComment = this.comments[this.comments.length];
    this.postService.addComment(this.lastComment);
  }

  getCommentLocalStorage(){
    const newComments : Comment[] =(this.postService.getCommentLocalStorage());
    newComments.forEach(newComment => {
      this.comments.push(newComment);      
    });
  }

  setCommentDate():void{
    this.date = new Date();
    this.dateComments.emit(this.date);
  }

}
