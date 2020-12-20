import React from 'react';
import Header from '../Home/Header/Header';

const BookShow = () => {
    const columns = [1, 2, 3, 4, 5];
    const rows = [1, 2, 3, 4, 5, 6, 7, 8];
    return (
        <div>
            <Header />
            <h1>BookShow</h1>
            <div>
                {
                    columns.map(col =>
                        <div>{
                            rows.map(row => <button>{col}" "{row}</button>)
                        }</div>
                    )
                }
            </div>
        </div>
    );
};

export default BookShow;