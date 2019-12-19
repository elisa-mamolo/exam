import React, {Component} from 'react';
import {Link} from "@reach/router";
import AnswerCategory from "./AnswerCategory";
class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: "",
            books: [{
                title: "",
                author: "",
                category: "",
                price: "",
                user: "",
                email: ""
            }]

        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    //on submit handle inputs of all the fields
    handleSubmit(event) {
        event.preventDefault();
        const inputs = event.target.getElementsByTagName("input");
        this.setState({
            category: this.props.getCategory(this.props.id),
            books: [
                {
                    title: inputs.title.value,// should match the name attribute on the input element
                    author: inputs.author.value,
                    category: inputs.category.value,
                    price: inputs.price.value,
                    user: inputs.user.value,
                    email: inputs.email.value,
                }
            ]

        });
        //this.props.addBook(this.props.id, this.state.book);
        this.props.addBook(this.props.getCategory(this.props.id), this.state.book);
        console.log(this.state.books);

        let category = this.props.getCategory(this.props.id);



    }



    //need to make the api call
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
                    <form onSubmit={this.handleSubmit}>
                        <div>
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title"/>
                        </div>
                        <div>
                        <label htmlFor="author">Author</label>
                        <input type="text" name="author"/>
                        </div>
                        <div>
                        <label htmlFor="category">Category</label>
                        <input type="text" name="category"/>
                        </div>
                        <div>
                        <label htmlFor="price">Price</label>
                        <input type="text" name="price"/>
                        </div>
                        <div>
                        <label htmlFor="user">User</label>
                        <input type="text" name="user" />
                        </div>
                        <div>
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" />
                        </div>
                        <div>
                        <input type="submit" value="Submit"/>
                        </div>
                    </form>
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

