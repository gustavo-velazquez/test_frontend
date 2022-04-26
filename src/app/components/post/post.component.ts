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

  id : number;
  post!: Post;
  dateComment: string ='';
  load!: boolean;
  showDate! : boolean;

  constructor(private activeRoute: ActivatedRoute, private postService: PostService) {
    this.id = +this.activeRoute.snapshot.params['id']; 
  }

  ngOnInit(): void {
    this.getPost(this.id);
  }

  getPost(id: number){
    this.postService.getPost(id)
    .subscribe((response : Post) => {this.post = response,this.load=true;} )
  }

  getDate(date: string){
    this.dateComment = date;
    (date!='')? this.showDate=true : this.showDate=false;
  } 

}
