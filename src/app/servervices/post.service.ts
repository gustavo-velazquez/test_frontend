import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  comments : Comment[]= [];

  constructor(private http: HttpClient) { }

  public getPosts(): Observable<Post[]>{
    const url:string = `https://jsonplaceholder.typicode.com/posts`;
    return this.http.get<Post[]>(url).pipe(map((data: Post[]) => data));
  }

  public getPost(id: number): Observable<Post>{
    const url:string = `https://jsonplaceholder.typicode.com/posts/${id}`;
    return this.http.get<Post>(url).pipe(map((data: Post) => data));
  }

  public getComment(id: number): Observable<Comment[]>{
    const url:string = `https://jsonplaceholder.typicode.com/posts/${id}/comments`;
    return this.http.get<Comment[]>(url).pipe(map((data: Comment[]) => data));
  }

  addComment(comment: Comment) {
    this.comments.push(comment);
    console.log(comment);
    this.saveLocalStorage();
  }

  public saveLocalStorage(){
    localStorage.setItem('comments',JSON.stringify(this.comments));
  }

  public getCommentLocalStorage(){
    if (localStorage.getItem('comments')) {
      this.comments = JSON.parse(localStorage.getItem('comments')!)
    }
    return this.comments  }

}
