import React from "react";

const Errors = props => {
    if(props.errors){
        console.log(props.errors);
        const errors = props.errors;
        return (
            <div className="alert alert-danger">
                {Object.keys(errors).map(key => {
                    return (
                        <li>{key} {errors[key]}</li>
                    )
                })}
            </div>
        );
    }
    return null;
};

export default Errors;