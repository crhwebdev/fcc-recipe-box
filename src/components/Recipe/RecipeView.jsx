import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getRecipe, deleteRecipe } from "actions/";
import BackButton from "components/Buttons/BackButton";
import EditButton from "components/Buttons/EditButton";
import DeleteButton from "components/Buttons/DeleteButton";



export class RecipeView extends Component{
    componentDidMount(){             
        this.props.getRecipe(this.props.match.params.id);                                                                
    }
  
    constructor(props){
        super(props);                
        this.recipe = null;      
        this.recipeId = this.props.match.params.id;   
        this.handleDeleteClick = this.handleDeleteClick.bind(this);    
        this.history = this.props.history;   
    }

    renderIngredients(){
        let ingredients = "";

        if(this.props.selectedRecipe.ingredients) {
            ingredients = this.props.selectedRecipe.ingredients.map( (ingredient, index) => <li className="collection-item" key={ index }>{ ingredient }</li> );            
        }

        return ingredients;
    }

    handleDeleteClick(){      
        this.props.deleteRecipe(this.props.selectedRecipe.id, this.history);        
    }

    render(){
        
        return (
            <div>
                <h1>{ this.props.selectedRecipe ? this.props.selectedRecipe.title : "" }</h1>                
                <div className="recipe-image">
                    <img src={this.props.selectedRecipe ? this.props.selectedRecipe.image : ""} />    
                </div>
                <EditButton recipeId={ this.recipeId }/>
                <DeleteButton handleDeleteClick={ this.handleDeleteClick } />                
                <BackButton />
                <div>
                    <p className="description">{this.props.selectedRecipe ? this.props.selectedRecipe.description : ""}</p>
                    <h3 className="servings">Servings: <span>{this.props.selectedRecipe ? this.props.selectedRecipe.servings : ""}</span></h3> 
                    <div className="ingredientList">
                        <h3 className="collection-header">Ingredients</h3>   
                        <ul className="collection with-header">                                                
                            { this.renderIngredients() }
                        </ul>
                    </div>                    
                </div>
            </div>
        );
    }
    
}


function mapStateToProps({ selectedRecipe }){
    return { selectedRecipe };
}

export default withRouter(connect(mapStateToProps, { getRecipe, deleteRecipe })(RecipeView));

