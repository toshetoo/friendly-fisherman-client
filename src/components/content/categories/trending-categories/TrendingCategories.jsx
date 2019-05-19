import React from 'react';
import './TrendingCategories.scss';
import { CategoryItem } from '../single/CategoryItem';
import CategoriesService from './../../../../core/services/categories.service';
import history from './../../../../core/history/History';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { UncontrolledTooltip } from 'reactstrap';

export class TrendingCategories extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            categories: []
        };
    }

    componentDidMount() {        
        CategoriesService.getTrendingCategories().then((response) => {
            this.setState({
                categories: Object.values(response.item) || []
            });            
        });
    }

    refreshCategories() {
        this.setState({
            isLoading: true
        }, () => {
            CategoriesService.getTrendingCategories().then((response) => {
                this.setState({
                    poll: Object.values(response.item) || [],
                    isLoading: false
                })
            })
        })       
    }

    onList() {
        history.push('/categories-list');
    }

    render() {
        let categories = <div>No trending categories!</div>;

        if (this.state.categories.length > 0) {
            categories = this.state.categories.map(c => {
                return (
                    <CategoryItem key={c.id} category={c}/>
                )
            }); 
        }              

        return (
            <div className="categories-holder">
                <div className="header-holder d-flex">
                    <span className="heading">
                        Trending Categories
                        <FontAwesomeIcon icon={faSyncAlt}
                            onClick={() => this.refreshCategories()} 
                            id="refresh-categories" 
                            className={"ml-2 cursor-pointer " + (this.state.isLoading ? 'fa-spin' : '')}>
                        </FontAwesomeIcon>
                        <UncontrolledTooltip placement="top" target="refresh-categories">
                                Refresh
                        </UncontrolledTooltip>
                    </span>
                    <span className="cursor-pointer list-btn" onClick={this.onList.bind(this)}>List</span>
                </div> 
                <div className="divider"></div>
                <ul className="cats">
                    {categories}
                </ul>                
            </div>
        );
    }
}