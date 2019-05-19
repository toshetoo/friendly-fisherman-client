import React from 'react';

export class CategoryItem extends React.Component {

    render() {
        return (
            <li className="d-flex"><a href="#">{this.props.category.name}</a><span className="badge d-flex">{this.props.category.count}</span></li>
        );
    }
}