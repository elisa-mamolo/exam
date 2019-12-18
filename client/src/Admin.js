import React, {Component} from 'react';
import {Link} from "@reach/router";
import AskCategory from "./AskCategory";

class Admin extends Component {

    removeCategory(event){

    }

    render() {
        return (
            <React.Fragment>
                <h3>Categories from admin</h3>
                <ol>
                    {this.props.categories.map(category =>
                        <li key={category._id}>
                            <Link to={`/category/${category._id}`}>{category.category}</Link>
                            <button onClick={(event) => this.removeCategory()}>Delete category</button>
                        </li>
                    )}
                </ol>
                <AskCategory askCategory={(category) => this.props.askCategory(category)}></AskCategory>
                <Link to="/">Go back</Link>
            </React.Fragment>
        );
    }
}

export default Admin;
