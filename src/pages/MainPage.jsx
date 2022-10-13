import React from "react"
import { useDispatch, useSelector } from 'react-redux'
import BoardsList from "../components/BoardsList"
import { ADD_BOARD } from "../store/types"

const MainPage = () => {
    const dispatch = useDispatch()
    const boards = useSelector(s => s.boards.boards.length)

    const handlerClick = e => {
        if(boards === 3) {
            alert('Можно содать тока три доски')
            return
        }

        dispatch({
            type: ADD_BOARD,
            payload: {
                id: Date.now(),
                title: '',
                cards: []
            }
        })
    }

    return(
       <div className="container">
        <BoardsList/>
        <div className="botttom">
            <button onClick={handlerClick} className="button">Добавить доску +</button>
        </div>
       </div>
    )
}

export default MainPage