import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/servervices/post.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  id : number;
  contactForm !: FormGroup;
  date!: Date ;
  @Input() postId!: number;

  constructor(private formBuilder:FormBuilder, private postService:PostService, private activeRoute: ActivatedRoute) { 
    this.id = +this.activeRoute.snapshot.params['id']; 
  }

  ngOnInit(): void {
    this.contactForm = this.initForm();
  }

  onSubmit(){
   
      this.date = new Date();      
      this.postService.addComment({
      postId: this.id,
      id:((!this.postService.comments.length)? 1 : this.postService.comments[this.postService.comments.length - 1].id + 1),
      name: this.contactForm.controls['name'].value,
      email: this.contactForm.controls['email'].value,
      body: this.contactForm.controls['comment'].value,
      date: this.date,
      storage: true
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
