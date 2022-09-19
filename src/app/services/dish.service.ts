import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }
  getDishes():Promise<Dish[]> {
    return Promise.resolve(DISHES);}
    getDish(id: string): Promise<Dish> {
      return new Promise(resolve=> {
        // Simulate server latency with 2 second delay
          setTimeout(() => resolve(DISHES.filter((dish) => (dish.id === id))[0]), 2000);
      });
    }
  
    getFeaturedDish(): Dish {
      return DISHES.filter((dish) => dish.featured)[0];
    }
}
