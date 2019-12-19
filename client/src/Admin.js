import React, {Component} from 'react';
import {Link} from "@reach/router";
import AskCategory from "./AskCategory";

class Admin extends Component {
    constructor(props) {
        super(props);
        //this line targets the category li that has the button contained,
        //without this line I am deleting all the category
        this.removeCategory = this.removeCategory.bind(this);

    }
    removeCategory(event) {
        //get category id
        this.props.removeCategory(this.props.id);
    }

    render() {
        return (
            <React.Fragment>
                <h3>Admin view - manage categories</h3>
                <ol>
                    {/*map the categories and show li element with button for delete*/}
                    {this.props.categories.map(category =>
                        <li key={category._id}  >
                            <Link to={`/category/${category._id}`}>{category.category}</Link>

                            <button onClick={() => this.props.removeCategory(category._id)}>Delete category</button>
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
