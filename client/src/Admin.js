import React, {Component} from 'react';
import {Link} from "@reach/router";
import AskCategory from "./AskCategory";

class Admin extends Component {
    constructor(props) {
        super(props);

        this.onClickClose = this.onClickClose.bind(this);

    }
    onClickClose() {
        let index = this.props.index;

        this.props.removeItem(index);
    }
    onClick(){
        //this.props.removeCategory();
        console.log(this.props.categories);


    }
    handleCheck(e) {
        console.log(e.target.key);
    }

    render() {
        return (
            <React.Fragment>
                <h3>Categories from admin</h3>
                <ol>
                    {this.props.categories.map(category =>
                        <li key={category._id}  >
                            <Link to={`/category/${category._id}`}>{category.category}</Link>
                            {/*<button onClick={this.handleCheck}>Delete category</button>*/}
                            <button onClick={this.onClickClose} key={category._id}>Delete category</button>
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
