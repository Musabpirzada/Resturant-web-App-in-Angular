import { Component, OnInit, ViewChild } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import {FormGroup, FormBuilder, Validators, NgForm} from '@angular/forms';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import {Comment} from '../shared/comments';
@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.css']
})
export class DishdetailComponent implements OnInit {
  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  disableSubmitButton: boolean;

  @ViewChild('slider')slider;
  commentFeedBackForm: FormGroup;
  comment: Comment;
  candidateComment: Comment;
  @ViewChild('cform') commentFormDirective:NgForm;
  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location, private cfb: FormBuilder) { this.createForm();
      this.disableSubmitButton = true;}
    commentForm: FormGroup; 
  ngOnInit(){
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
    .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
  }
  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }
  goBack(): void {
    this.location.back();
  }
  
  createForm():void {
    this.commentFeedBackForm = this.cfb.group({
      rating: '',
      comment: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(250)] ],
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      date: new Date().getTime()
    });
    this.commentFeedBackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set form validation message
    this.commentFeedBackForm.valueChanges.subscribe(value => this.onValueChangedCandidate(value));
  }
  tryAddComment(comment: Comment):void{
    if(this.commentFeedBackForm.valid){
      this.dish.comments.push(comment);
    }
  }

  onValueChangedCandidate(value?: any){
    if (!this.commentFeedBackForm) { return; }
    if(this.commentFeedBackForm.valid) {
      this.disableSubmitButton = false;
      this.candidateCommentAdd(this.disableSubmitButton,value);
    }else{
      this.disableSubmitButton = true;
      this.deleteMsg(this.dish.comments,value);
    }
  }

  onValueChanged(data?: any) {
    if (!this.commentFeedBackForm) { return; }
    const form = this.commentFeedBackForm;
    for (const field in this.commentFormErrors) {
      if (this.commentFormErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.commentFormErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.commentFormErrors[field] += messages[key];
            }
          }
        }
      }
    }
  }

  candidateCommentAdd(disabled: boolean,comment: Comment){
    if(!disabled && comment){
      this.candidateComment = comment;
    }
  }

  deleteMsg(commnets: Comment[],comment: Comment) {
    const index: number = commnets.indexOf(comment);
    if (index !== -1) {
      commnets.splice(index, 1);
    }
  }

  commentFormErrors = {
    'comment': '',
    'author': ''
  };

  validationMessages= {
    'author': {
      'required': 'Author Name is required',
      'minlength': 'Author name must be at least 2 characters long',
      'maxlength': 'Author name cannot be more than 25 characters'
    },
    'comment': {
      'required': 'Comment is required',
      'minlength': 'Comment must be at least 5 characters long',
      'maxlength': 'Comment cannot be more than 250 characters'
    }
  };
  onSubmit() {
    this.comment = this.commentForm.value;
    const d = new Date();
    this.comment.date = d.toISOString();
    this.dish?.comments.push(this.comment);
    console.log(this.comment);
    this.commentForm.reset({
      author: '',
      rating: 5,
      comment: ''
    });
    this.commentFormDirective.resetForm();
  }
  };
  
