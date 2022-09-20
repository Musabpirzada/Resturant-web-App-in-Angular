import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import {LEADERS} from '../shared/leaders';
import {Leader} from '../shared/leader';
import {LeaderService} from '../services/leader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dish: Dish;
  promotion: Promotion;
  lead: Leader;
  constructor(private dishservice: DishService,
    private promotionservice: PromotionService, private leadservice: LeaderService) { }

  ngOnInit(): void {
    this.dishservice.getFeaturedDish().subscribe(dish=>this.dish = dish);
    this.promotion = this.promotionservice.getFeaturedPromotion();
    this.lead = this.leadservice.getFeaturedLeader();
  }

}
