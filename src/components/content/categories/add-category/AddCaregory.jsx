import React from 'react';
import './AddCategory.scss';
import CategoriesService from './../../../../core/services/categories.service';
import history from './../../../../core/history/History';
import { Button } from 'reactstrap';

export class AddCategory extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            name: ''
        };
    }

    componentDidMount() {
        if (this.props.computedMatch.params.id) {
            CategoriesService.getById(this.props.computedMatch.params.id).then((resp) => {
                const item = resp.item;
                this.setState({
                    id: item.id,
                    name: item.name
                });
            })
        }
    }

    onChange(event) {
        event.persist();
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onSubmit(event) {
        event.preventDefault();
        CategoriesService.save(this.state).then((response) => {
            if (response.data.error) {
                this.setState({
                    errors: response.data.error
                });
            } else {
                history.push('/categories-list');
            }
        });
    }

    render() {
        return (
            <div className="container poll-creation-container">
                <div className="form-holder">
                    <div className="errors text-center">
                        <span className="text-danger">{this.state.errors}</span>
                    </div>
                    <div className="row">
                        <div className="col-12 text-center">
                            <h4 className="mt-3">{this.props.computedMatch.params.id ? 'Edit' : 'Add'} category</h4>
                        </div>                       
                    </div>
                    <form onSubmit={this.onSubmit.bind(this)}>
                        <div className="row mt-3">
                            <div className="col-12">
                                <input type="text" name="name" 
                                id="name" 
                                laceholder="Name" 
                                onChange={this.onChange.bind(this)} 
                                value={this.state.name}
                                required/>
                            </div>                        
                        </div>
                        <div className="row mt-3">
                            <div className="col-12 text-center">
                                <Button type="submit" color="primary">Save</Button>
                            </div>                            
                        </div>
                    </form>
                </div>
            </div>            
        );
    }
}