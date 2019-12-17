import React, {Component} from 'react';
import {Link} from "@reach/router";


class Categories extends Component {

    render() {
                return (
                    <React.Fragment>
                        <h3>Categories</h3>
                        <ol>
                            {this.props.categories.map(category =>
                                <li key={category._id}>
                                    <Link to={`/category/${category._id}`}>{category.category}</Link>

                                </li>
                            )}
                        </ol>
                        {/*<AskCategory askCategory={(category) => this.props.askCategory(category)}></AskCategory>*/}

                    </React.Fragment>
                );
}
}

export default Categories;

