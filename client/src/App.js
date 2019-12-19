import React, {Component} from 'react';
import { Link, Router } from "@reach/router";
import Admin from "./Admin";
import Categories from "./Categories";
import Category from "./Category";
import AuthService from './AuthService';
import Login from "./Login";
import Navigation from "./Navigation";

class App extends Component {

    API_URL = process.env.REACT_APP_API_URL;
    constructor(props) {
        super(props);

        // Initialize the auth service with the path of the API authentication route.
        this.Auth = new AuthService(`${this.API_URL}/users/authenticate`);

        // This is my state data initialized
        this.state = {
            categories: [],
            userCredentials: [{ // TODO: These need to come from a React login component.
                //replace with login component that targets the state
                username: "elisa",
                password: "123",
                admin: true
            },
       {
            //replace with login component that targets the state
            username: "giulia",
                password: "password",
            admin: false
        }]
        };

    }
    componentDidMount() {

        this.getData();
        // TODO: Do this from a login component instead
        /*this.login(
            this.state.userCredentials.username,
            this.state.userCredentials.password);*/
    }

    async login(username, password) {
        try {
            const resp = await this.Auth.login(username, password);
            console.log("Authentication:", resp.msg);
            this.getData();

        } catch (e) {
            console.log("Login", e);
        }
    }

    async logout(event) {
        event.preventDefault();
        this.Auth.logout();
        await this.setState({
            userCredentials: [],
            categories: []
        });
    }

    async getData() {
        const resp = await this.Auth.fetch(`${this.API_URL}/categories`);
        const data = await resp.json();
        this.setState({
            categories: data
        });
    }


    //method foe getting the questions
    async getCategories() {
        let url = `${this.API_URL}/categories`;
        let result = await fetch(url); //get the data
        let json = await result.json(); //turn data into JSON
        return this.setState({
            categories: json //set it in the state
        })
    }

    //method for posting a category
    async askCategory(category){

        this.postData(category);
    }
    //the above method calls this method for the post request
    async postData(category) {
        let url = `${this.API_URL}/categories`;
        fetch(url, {
            method: "POST",
            body: JSON.stringify({
                category: category
            }), headers : {
                "Content-type" : "application/json",
                Authorization : "Bearer " + this.Auth.getToken()
            }
        })
            .then(res => res.json())
            .then( json => {
                this.getCategories();
            })
        //let result = await fetch(url); //get the data
        //let json = await result.json(); //turn data into JSON
        //return this.setState({
          //  questions: json //set it in the state
        //})
    }
    async removeCategory(id) {
        let url = `${this.API_URL}/categories/`
            .concat(id);
        fetch(url, {
            method: "DELETE",
            dataType: "json",
            headers: {
                "Content-type": "application/json",
                Authorization: "Bearer " + this.Auth.getToken()
            }
        })
            .then(res => res.json())
            .then(json => {
                this.getCategories();
            })
    }

    //the above method calls this method for the post request
    async addBook(id, book) {
        let url = `${this.API_URL}/categories/`
            .concat(id)
            .concat("/books");
        fetch(url, {
            method: "POST",
            dataType: "json",
            body: JSON.stringify({
                book: book
            }), headers : {
                "Content-type" : "application/json",
                Authorization : "Bearer " + this.Auth.getToken()
            }
        })
            .then(res => res.json())
            .then( json => {
                    this.getCategories();
            })
        //let result = await fetch(url); //get the data
        //let json = await result.json(); //turn data into JSON
        //return this.setState({
        //  questions: json //set it in the state
        //})
    }

    getCategory(id){
        //find question by id
        return this.state.categories.find(q => q._id === id)
    }


    render() {

        console.log(this.state.userCredentials.admin);

        return (

            <React.Fragment>
                <h1>Book shop</h1>

                <div className="container">

                    {(this.Auth.getUsername() === "elisa") ? <Navigation></Navigation> : 'Not admin user'}


                    {this.Auth.getUsername() ?
                        <small>Logged in: {this.Auth.getUsername()}.
                            <Link to="/">Post a book</Link>
                            <button
                            onClick={(event) => {this.logout(event)}}>Logout.</button>
                        </small>
                        : <Login login={(username, password) => this.login(username, password)}/>}


                </div>


                <Router>

                    <Categories path="/" categories={this.state.categories}
                                askCategory={(text) => this.askCategory(text)}/>

                    <Category
                        addBook={(id, book) => this.addBook(id, book)}
                        path="/category/:id"
                        getCategory={id => this.getCategory(id)}>
                    </Category>
                    <Login
                        path="/login" login={(username, password) => this.login(username, password) }>
                    </Login>
                    <Admin path="/admin"
                           categories={this.state.categories}
                           getCategory={id => this.getCategory(id)}
                           askCategory={(text) => this.askCategory(text)}
                           removeCategory={id => this.removeCategory(id)}></Admin>



                </Router>

            </React.Fragment>
        )
    }
}

export default App;

