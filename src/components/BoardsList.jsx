import React from "react"
import {useSelector} from 'react-redux'
import Board from "./Board"

const BoardsList = () => {
    const boards = useSelector(s => s.boards.boards)

    return(
        <ul className="board__list">
            {boards.map((item, index) => <Board key={item.id} data={item} index={index} />)}
        </ul>
    )
}

export default BoardsList