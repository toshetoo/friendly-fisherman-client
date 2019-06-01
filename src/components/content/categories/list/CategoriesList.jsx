import React from 'react';
import './CategoriesList.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import history from './../../../../core/history/History';
import { UncontrolledTooltip } from 'reactstrap';
import CategoriesService from './../../../../core/services/categories.service';

export class CategoriesList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            categories: []
        };
    }

    componentDidMount() {
        CategoriesService.getAll().then((response) => {
            this.setState({
                categories: response.data.items
            });

            console.log(this.state.categories);
        });
    }

    onAddCategory() {
        history.push('/admin/add-category');
    }

    onEditCategory(id) {
        history.push('/admin/add-category/' + id);
    }

    onDeleteCategory(categoryId, index) {
        CategoriesService.delete(categoryId).then(() => {
            const categories = this.state.categories;
            const index = categories.findIndex(p => p.id === categoryId);
            categories.splice(index, 1);

            this.setState({
                categories: categories
            });
        });
    }

    render() {
        const categories = this.state.categories.map(category => {
            return (
                <div className="list-item" key={category.id}>
                    <div className="row">
                        <div className="col-10 p-3">
                            <h4 className="ml-3 cursor-pointer">{category.name}</h4>
                        </div>
                        <div className="col-2 d-flex align-items-center justify-content-center text-right">
                            <span className="cursor-pointer mr-2"><FontAwesomeIcon icon={faPen} onClick={() => this.onEditCategory(category.id)} id="edit-btn"/></span>
                            <UncontrolledTooltip placement="top" target="edit-btn">
                                Edit
                            </UncontrolledTooltip>
                            <span className="cursor-pointer mr-2"><FontAwesomeIcon icon={faTrashAlt} onClick={() => this.onDeleteCategory(category.id)} id="delete-btn"/></span>
                            <UncontrolledTooltip placement="top" target="delete-btn">
                                Delete
                            </UncontrolledTooltip>
                        </div>
                    </div>
                </div>
            );
        });


        return (
            <div className="categories-list">
                <div className="row">
                    <div className="col-12 text-right mb-3">
                        <button className="create-btn btn btn-primary" onClick={this.onAddCategory.bind(this)}>Add Category</button>
                    </div>
                </div>
                <div className="list-hoder">
                    {categories}
                </div>
            </div>
        );
    }
}