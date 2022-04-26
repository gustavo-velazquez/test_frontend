import { Component, Input, OnInit, Output } from '@angular/core';
import { Comment } from 'src/app/models/comment.model';
import { PostService } from 'src/app/servervices/post.service';
import { EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  id: number;

  @Input() postId !: number;
  @Output() dateComments = new EventEmitter(); 

  date!: Date;

  comments !: Comment[];
  lastComment!: Comment ;

  constructor(private postService: PostService,private activeRoute: ActivatedRoute) {
    this.id = +this.activeRoute.snapshot.params['id']; 
   }

  ngOnInit(): void {
    this.getcomments();
  }

  getcomments(){
    this.postService.getComment(this.id)
    .subscribe((response: Comment[]) => {
    this.comments = response;
    this.getCommentLocalStorage(); });
  }

  saveComment(){
    this.lastComment = this.comments[this.comments.length];
    this.postService.addComment(this.lastComment);
  }

  deleteComment(id:number){
    this.comments = this.comments.filter((comment: Comment) => comment.id !== id)
    this.postService.comments = this.comments
    this.postService.saveLocalStorage();
  }

  getCommentLocalStorage(): void{
    const newComments : Comment[] = this.postService.getCommentLocalStorage();
    
    if (newComments.length){
      newComments.forEach(newComment => {
        if(newComment.postId === this.id){
          this.comments.push(newComment);  
        }   
      });
    }
  }

  setCommentDate():void{
    if((this.comments[this.comments.length-1]).date === undefined){
      this.dateComments.emit(new Date);
    }
    else{
      this.dateComments.emit((this.comments[this.comments.length-1]).date)
    }
    
  }

}
