import React from 'react';
import { Field } from 'redux-form';
import FormTextField from 'components/Form/FormTextField';


const instructionInput = ( { input, label, meta: {error, submitFailed } }) => {
    return (
    <div className="input-field col s11">        
        <input {...input} type="text" placeholder={label} /> 
        <div style={{ marginBottom: '20px', color: 'red' }}>  
            {submitFailed && error} 
        </div>    
    </div>);
};

export default ({ fields, meta: {error, submitFailed } }) => {        
    return (
        <ul>
            <li>
                <button 
                    className="waves-effect waves-light btn"
                    type="button" 
                    onClick={ () => fields.push({}) }
                >
                    Add Instruction
                </button>   
                <div style={{ marginBottom: '20px', color: 'red' }}>  
                    { submitFailed && error } 
                </div>               
            </li>
            {fields.map( (instruction, index) => (
                <li key={index}>
                    <h4>Instruction #{index + 1}</h4>                                                             
                    <div className="row">
                        <div className="col s1">
                            <button
                                className="waves-effect waves-light btn red delete-button"
                                onClick={ () => fields.remove(index) }                              
                            >
                                <i className="material-icons">delete</i>
                            </button>
                        </div>                               
                        <Field 
                            name={instruction}
                            label="Instruction"
                            component={instructionInput}                                           
                        />
                    </div>                     
                </li>                
            ) )}
        </ul>     
    );
};