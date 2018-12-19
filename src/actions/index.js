import {  RecipeLimitReached, DuplicateRecipe, RecipeDoesNotExist } from "model/error.js";
import model from "model/index";
import { 
    GET_RECIPES, 
    GET_RECIPE, 
    ADD_RECIPE, 
    EDIT_RECIPE, 
    DELETE_RECIPE, 
    SET_RECIPE_TO_DELETE, 
    SET_MESSAGE_DISPLAY } from "actions/types";

export const getRecipes = () => {            
    const payload = model.getAllRecipes();             
    return { type: GET_RECIPES, payload };
}

export const getRecipe = ( id ) => {
    return { type: GET_RECIPE, payload: { id } };
}

export const addRecipe = ( recipe, history ) => {
    return { type: ADD_RECIPE, payload: { recipe }, history };
}

export const editRecipe = ( recipe, history ) => { 
    return { type: EDIT_RECIPE, payload: { recipe }, history };
}

export const deleteRecipe = ( id, history ) => {        
    return { type: DELETE_RECIPE, payload: { id }, history };
}

export const setRecipeToDelete = ( id ) => {    
    return { type: SET_RECIPE_TO_DELETE, payload: { id } };
}

export const setMessageDisplay = ( message ) => {
    return { type: SET_MESSAGE_DISPLAY, payload: { message }}
}
