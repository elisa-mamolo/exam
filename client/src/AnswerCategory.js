import React, {Component} from 'react';

class AnswerCategory extends Component {

    constructor(props) {
        super(props);

        this.state = {
            input: ""
        }
    }

    onChange(event) {
        this.setState({
            input: event.target.value
        })
    }

    onClick(event) {
        this.props.addBook(this.state.input);
    }

    render() {
        return (
            <React.Fragment>
                <h4>Add book</h4>
                <input onChange={(event) => this.onChange(event)}
                       type="text"
                       placeholder="Type book here!">
                </input>
                <button onClick={() => this.onClick()}>Add!</button>
            </React.Fragment>
        )
    }
}

export default AnswerCategory;
