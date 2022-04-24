import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './components/error404/error404.component';
import { NgModule } from '@angular/core';
import { PostsComponent } from './components/posts/posts.component';

const routes: Routes = [
  {path: '',component: PostsComponent},
  {path: '**', component: Error404Component}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
