import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  comment : Comment | undefined;

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
    this.comment = comment
    this.saveLocalStorage();
  }

  public saveLocalStorage(){
    localStorage.setItem('comment',JSON.stringify(this.comment));
  }

  public getCommentLocalStorage(){
    return (localStorage.getItem('comment'))?  JSON.parse(localStorage.getItem('comment')!): this.comment ;
  }

}
