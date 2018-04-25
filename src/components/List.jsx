import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRecipes } from "../actions";


class List extends Component{
    
    componentDidMount(){
        this.props.getRecipes();
    }

    createRecipeList(){                
        const listing = this.props.recipes ? 
            this.props.recipes.map((recipe, index)=>{
                return <Link to="/recipe/1555" key={index}><li>{recipe.title}</li></Link>;
            }) :
        <li>Loading...</li>;
                        
        return listing;
    }

    render(){        
        return (
            <div>
                <h1>Recipe List</h1>
                <Link className="waves-effect waves-light btn" to="/recipe/new">Create New Recipe</Link>
                <div>
                    <ul>
                        {this.createRecipeList()}
                    </ul>
                </div>
                
            </div>
        );
    }
}


function mapStateToProps({ recipes }){
    return { recipes };
}

export default connect(mapStateToProps, { getRecipes })(List);

