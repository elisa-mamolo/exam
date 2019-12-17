import React, {Component} from 'react';
import {Link} from "@reach/router";
import AnswerCategory from "./AnswerCategory";
class Book extends Component {

    render() {
        const category = this.props.getCategory(this.props.id);
        let content = <p>Loading</p>
        if (category) {
            content =
                <React.Fragment>
                    <h4>{category.category}</h4>

                    <h6>Books</h6>
                    <ul>
                        {/*_id to have an unique key */}
                        {category.books.map(q => <li key={q._id}>
                            Title: {q.title}
                            Author: {q.author}
                            Price: {q.price}
                            User: {q.user}
                            Email: {q.email}
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
                <AnswerCategory
                    addBook={(id, book) => this.props.addBook(id, book)}>
                </AnswerCategory>

                <Link to="/">Go back to categories</Link>
            </React.Fragment>
        )
    }
}

export default Book;