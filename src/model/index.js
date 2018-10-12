import seed from "model/seed.js";

let recipes = [];
let testMode = false;
let Model = {};
let recipesInitialized = false;


Model.toggleTestMode = function(state){
    testMode = state;
    if(testMode){
        recipes = seed;
    } else {
        recipes = [];
    }    
}


Model.getAllRecipes = function(){
    
    if(shouldGetRecipesFromStorage()){
        initialize();
        recipes = getRecipesFromStorage();    
    }
    
    return recipes;
};

Model.addRecipe = function(recipe){
    
    refreshRecipes();

    if(recipes.findIndex( item => item.id === recipe.id ) > -1){    
        return { error: "Already exists" };
    }   

    //push recipe to recipes
    recipes.push(recipe);  
        
    addRecipesToStorage();
    
    return recipes;
};

Model.editRecipe = function(recipe){

    //if recipes length is less than one, it may mean that we need to get them from localstorage
    refreshRecipes();

    //find recipe in recipes
    let matchPosition = recipes.findIndex( matchingRecipe => matchingRecipe.id === recipe.id  );
    if(matchPosition === -1){
        return { error: "Does not exist" };    
    }

    recipes[matchPosition] = recipe;   

    addRecipesToStorage();

    return recipes;
};

Model.getRecipeById = function(id){
    refreshRecipes();
    let recipe = recipes.filter( recipe => recipe.id === id);
    
    if(recipe.length < 1){
        return { error: "Recipe does not exist" };
    }        
        
    return recipe[0];    
};

Model.deleteRecipeById = function(id){
    //if recipes length is less than one, it may mean that we need to get them from localstorage
    refreshRecipes();
    let matchPosition = recipes.findIndex( recipe => recipe.id === id );
    if(matchPosition === -1){        
        return { error: "Recipe does not exist" };
    }

    //splice it out
    recipes.splice(matchPosition, 1);

    addRecipesToStorage();

    return recipes;
};

function initialize(){
    recipesInitialized = localStorage.getItem('recipesInitialized');         
    if(!testMode && !recipesInitialized){
        console.log("populating data...");
        populateSeedDataToStorage();
        localStorage.setItem('recipesInitialized', true);
    }    
}

//Function that checks to see if recipes state should be retrieved from localstorage or not
function shouldGetRecipesFromStorage(){
    return recipes.length <= 0 && !testMode;
}

//Function to check if recipes state should be added to localstorage
function shouldAddRecipesToStorage(){
    return !testMode;
}

//Function to retireve recipes state from localstorage and convert to appropriate format for
// in memory storage
function getRecipesFromStorage(){
    // return seed;
    let storedRecipes = JSON.parse(localStorage.getItem('recipes'));
    return storedRecipes ? storedRecipes : [];
}

function refreshRecipes(){
    if(shouldGetRecipesFromStorage()){
        recipes = getRecipesFromStorage();
    }
}

//Function to add recipes to localstorage in appropriate format
function addRecipesToStorage(){
    if(shouldAddRecipesToStorage()){
        localStorage.setItem('recipes', JSON.stringify(recipes));
    }
}

//Function to clear local storage
function clearStorage(){
    localStorage.removeItem('recipes');
}

//populates premade recipes to storage if storage is empty
function populateSeedDataToStorage(){
    let retrievedRecipes = getRecipesFromStorage();    
    if(retrievedRecipes.length < 1){
        console.log('adding recipes...');
        localStorage.setItem('recipes', JSON.stringify(seed));
    }
}



export default Model;