import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from 'src/app/models/comment.model';
import { PostService } from 'src/app/servervices/post.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  contactForm !: FormGroup;
  postId!: number;
  date!: Date ;

  constructor(private formBuilder:FormBuilder, private postService:PostService) { }

  ngOnInit(): void {
    this.contactForm = this.initForm();
  }

  onSubmit(){
      this.date = new Date();      
      this.postService.addComment({
      postId: this.postId,
      id: this.postService.comments.length +1,
      name: this.contactForm.controls['name'].value,
      email: this.contactForm.controls['email'].value,
      body: this.contactForm.controls['comment'].value,
      date: this.date
    })
    this.contactForm.reset();
    
  }

  initForm():FormGroup{
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9!#$%&'*\/=?^_`{|}~+-]([\.]?[a-zA-Z0-9!#$%&'*\/=?^_`{|}~+-])+@[a-zA-Z0-9]([^@&%$/()=?¿!.,:;]|\d)+[a-zA-Z0-9][\.][a-zA-Z]{2,4}([\.][a-zA-Z]{2})?")]],
      comment: ['', [Validators.required, Validators.maxLength(500)]]
    })

  }

}
