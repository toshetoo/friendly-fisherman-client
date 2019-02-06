import React from 'react';
import './CategoriesList.scss';
import { CategoryItem } from '../single/CategoryItem';

export class CategoriesList extends React.Component {

    render() {
        return (
            <div className="categories-holder">
                <h3>Categories</h3>
                <div className="divider"></div>
                <ul className="cats">
                    <CategoryItem />
                    <CategoryItem />
                    <CategoryItem />
                    <CategoryItem />
                    <CategoryItem />
                    <CategoryItem />
                    <CategoryItem />
                </ul>
            </div>
        );
    }
}