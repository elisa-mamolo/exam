import React, {Component} from 'react';
import {Link} from "@reach/router";
import AnswerCategory from "./AnswerCategory";
class Category extends Component {

    render() {
        const category = this.props.getCategory(this.props.id);

        /*const list = question.answers.map(ans => <li>{ans.text}
            - ({ans.votes})</li>);*/
        let content = <p>Loading</p>
        if (category) {
            content =
                <React.Fragment>
                    <h4>{category.category}</h4>

                    <h6>Books</h6>
                    <ul>
                        {/*_id to have an unique key */}
                        {category.books.map(q => <li key={q._id}>
                            <Link to={`/books/${q._id}`}>{q.title}</Link>
                        </li>)}


                    </ul>

                </React.Fragment>
        }
        return (
            <React.Fragment>
                {/*<h3>Question!</h3>
                <p key={question.id}>{question.question}</p>

                <ul>
                    {question.answers.length === 0 ? <p>No Answers!</p> : list}
                </ul>
                */}
                {content}
                {/*<AnswerCategory
                    addBook={(id, book) => this.props.addBook(id, book)}>
                </AnswerCategory>*/}

                <Link to="/">Go back to categories</Link>
            </React.Fragment>
        )
    }
}

export default Category;

