import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  public getPosts(): Observable<Post[]>{
    const url:string = `https://jsonplaceholder.typicode.com/posts`;
    return this.http.get<Post[]>(url).pipe(map((data: Post[]) => data));
  }

  public getPost(id: number): Observable<Post>{
    const url:string = `https://jsonplaceholder.typicode.com/posts/${id}`;
    return this.http.get<Post>(url).pipe(map((data: Post) => data));
  }

}
