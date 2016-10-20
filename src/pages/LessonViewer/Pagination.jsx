'use strict';

import React from 'react';

const MAX_PAGINATION_ITEMS = 10;

export default class Pagination extends React.Component {

    shouldComponentUpdate(nextProps) {
        return (this.props.currentPageIndex !== nextProps.currentPageIndex
            || this.props.totalPages !== nextProps.totalPages
        );
    }

    render() {
        let items = [];

        if (this.props.totalPages <= MAX_PAGINATION_ITEMS) {
            for (let i=0; i < this.props.totalPages; i++) {
                let className = 'screen-paginator__unit ';

                if (i == this.props.currentPageIndex) {
                    className += 'screen-paginator__unit--active';
                }

                items.push(<li className={className} key={i}></li>);
            }
        }

        return <div className="screen-paginator">
            <ul className="screen-paginator__block">
                {items}
            </ul>

            {this.props.currentPageIndex+1} Сторінка
        </div>;
    }

}