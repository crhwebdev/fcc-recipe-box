import { GET_RECIPES, ADD_RECIPE, EDIT_RECIPE, DELETE_RECIPE } from "actions/types";
import {  RecipeLimitReached, DuplicateRecipe, RecipeDoesNotExist } from "model/error.js";
import Model from "model/index";


export default (state = [], action, model = Model) => {    
    let recipe = {};
    let newState = state;
    switch (action.type) {
        case GET_RECIPES:                    
            return action.payload;
        //action contains **recipe** to be added                                              
        case ADD_RECIPE:                   
            recipe.title = action.payload.recipe.title;
            recipe.description = action.payload.recipe.description;
            recipe.image = action.payload.recipe.image;
            recipe.servings = action.payload.recipe.servings;            
            recipe.ingredients = action.payload.recipe.ingredients;
            recipe.instructions = action.payload.recipe.instructions;
                         
            try {
                newState = model.addRecipe(recipe);
            }
            catch(error){
                if(error.name == 'DuplicateRecipe'){                   
                    throw new DuplicateRecipe();                    
                } else if(error.name == 'RecipeLimitReached'){
                    throw new RecipeLimitReached();
                } else {
                    throw new Error("An error has occured");
                }                
            }                        
            action.history.push("/");
            return newState;
        //action contains **recipe** to be updated                           
        case EDIT_RECIPE:            
            return action.payload;
        //action continas the **id** of a recipe to be deleted    
        case DELETE_RECIPE:                        
            return action.payload;
        default:
            return newState;
    }
    
}




