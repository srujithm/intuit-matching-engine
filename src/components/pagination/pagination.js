import React from 'react';
import { AiOutlineBackward, AiOutlineForward } from 'react-icons/ai';
import './pagination.scss';

const Pagination = ({pages, page, updatePage}) => {
    if ( pages < 10) {
        return (
            <div className="pagination">
                <AiOutlineBackward size="1.25em" style={{marginRight: "8px", cursor: "pointer"}} onClick={() => updatePage(1)}/>
                {
                    [...Array(pages).keys()].map(index => (
                        <span key={index} className={page === index + 1 ? 'active': ''} onClick={() => updatePage(index + 1)}>{index + 1}</span>
                    ))
                }
                <AiOutlineForward size="1.25em" style={{marginLeft: "8px", cursor: "pointer"}} onClick={() => updatePage(pages)}/>
            </div>
        )
    } else {
        let pageLeft = page - 4;
        let pageRight = page + 3;
        if ( pageLeft < 0) {
            return (
                <div className="pagination">
                    <AiOutlineBackward size="1.25em" style={{marginRight: "8px", cursor: "pointer"}} onClick={() => updatePage(1)}/>
                    {
                        [...Array(4).keys()].map(index => (
                            <span key={index} className={page === index + 1 ? 'active': ''} onClick={() => updatePage(index + 1)}>{index + 1}</span>
                        ))
                    }
                    <span onClick={() => updatePage(page + Math.abs(pageLeft) + 1)}>...</span>
                    <span onClick={() => updatePage(pages)}>{pages}</span>
                    <AiOutlineForward size="1.25em" style={{marginLeft: "8px", cursor: "pointer"}} onClick={() => updatePage(pages)}/>
                </div>
            )
        } else if ( pageRight > pages) {
            return (
                <div className="pagination">
                    <AiOutlineBackward size="1.25em" style={{marginRight: "8px", cursor: "pointer"}} onClick={() => updatePage(1)}/>
                    <span onClick={() => updatePage(1)}>1</span>
                    <span onClick={() => updatePage(page - 4)}>...</span>
                    {
                        [...Array(4).keys()].reverse().map(index => (
                            <span key={pages - index} className={page === pages - index? 'active': ''} onClick={() => updatePage(pages - index)}>{pages - index}</span>
                        ))
                    }
                    <AiOutlineForward size="1.25em" style={{marginLeft: "8px", cursor: "pointer"}} onClick={() => updatePage(pages)}/>
                </div>
            )
        } else {
            return (
                <div className="pagination">
                    <AiOutlineBackward size="1.25em" style={{marginRight: "8px", cursor: "pointer"}} onClick={() => updatePage(1)}/>
                    <span onClick={() => updatePage(1)}>1</span>
                    <span onClick={() => updatePage(page - 3)}>...</span>
                    <span onClick={() => updatePage(page - 2)}>{page - 2}</span>
                    <span onClick={() => updatePage(page - 1)}>{page - 1}</span>
                    <span onClick={() => updatePage(page)} className="active">{page}</span>
                    <span onClick={() => updatePage(page + 1)}>{page + 1}</span>
                    <span onClick={() => updatePage(page + 2)}>{page + 2}</span>
                    <span onClick={() => updatePage(page + 3)}>...</span>
                    <span onClick={() => updatePage(pages)}>{pages}</span>
                    <AiOutlineForward size="1.25em" style={{marginLeft: "8px", cursor: "pointer"}} onClick={() => updatePage(pages)}/>
                </div>
            )
        }
    }
};

export default Pagination;
