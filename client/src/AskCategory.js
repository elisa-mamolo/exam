import React, {Component} from 'react';

class AskCategory extends Component {

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
        this.props.askCategory(this.state.input);
    }

    render() {
        return (
            <React.Fragment>
                <h4>Add category</h4>
                <input onChange={(event) => this.onChange(event)}
                       type="text"
                       placeholder="Type category here!">
                </input>
                <button onClick={() => this.onClick()}>Add Category</button>
            </React.Fragment>
        )
    }
}

export default AskCategory;

