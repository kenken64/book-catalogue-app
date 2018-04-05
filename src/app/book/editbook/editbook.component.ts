import { Component, Input, OnChanges, OnInit }       from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Ingredient } from './Ingredient';
import { Recipe } from './recipe';

@Component({
  selector: 'app-editbook',
  templateUrl: './editbook.component.html',
  styleUrls: ['./editbook.component.css']
})
export class EditbookComponent implements OnInit,OnChanges {
  @Input() recipe: Recipe;
  
  editBookForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.initForm();
  }

  initForm(){
    this.editBookForm = this.fb.group({
      name: '',
      ingredientsList: this.fb.array([])
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.recipe = this.prepareSaveRecipe();
  }

  prepareSaveRecipe(){
    const formModel = this.editBookForm.value;

    const ingredientsDeepCopy:Ingredient[] = formModel.ingredientsList.map(
      (ingredient: Ingredient) => Object.assign({}, ingredient)
    );

    const saveRecipe: Recipe = {
      ingredients: ingredientsDeepCopy
    };
    console.log(saveRecipe.ingredients);
    return saveRecipe;
  }

  ngOnChanges() {
    this.rebuildForm();
  }

  get ingredients(): FormArray {
    return this.editBookForm.get('ingredientsList') as FormArray;
  };

  rebuildForm(){
    //this.setAddresses(this.hero.addresses);
  }

  addIngredient() {
    this.ingredients.push(this.fb.group(new Ingredient()));
  }
}
