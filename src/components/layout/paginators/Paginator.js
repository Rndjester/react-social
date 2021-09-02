import React, {useState} from "react";

export const Paginator = ({totalUsersCount, pageSize, onSetPage, currentPage, portionSize}) => {
    let pagesCount = Math.ceil(totalUsersCount/pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount/pageSize)
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber -1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize

    return (

        <div className= "friends__pagination">
            { portionNumber > 1 &&
                <div className='friends__pagination-button controll' onClick={() => setPortionNumber(portionNumber-1)}>
                    Назад
                </div>

            }

            {pages.filter(p => {
                return p >= leftPortionPageNumber && p <= rightPortionPageNumber
            }).map((p) => {
                return (
                    <div onClick={() => {onSetPage(p)}}
                         className={(currentPage === p && 'friends__pagination-button active')
                         || "friends__pagination-button"}>{p}</div>
                )
            })}
            { portionCount > portionNumber &&
            <div className='friends__pagination-button controll' onClick={() => setPortionNumber(portionNumber+1)}>
                Вперед
            </div>
            }
        </div>
    )
}
