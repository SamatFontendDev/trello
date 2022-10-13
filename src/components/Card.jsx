import React from "react"
import { useDispatch } from "react-redux"
import {Link} from 'react-router-dom'
import { PREV_BOARD, NEXT_BOARD } from "../store/types"
import SvgIcon from "./SvgIcon"

const Card = ({data, indexBoard}) => {
    const dispatch = useDispatch()

    const prevHandler = () => {
        dispatch({
            type: PREV_BOARD,
            payload: {
                index: indexBoard,
                data: data
            }
        })
    }

    const nextHandler = () => {
        dispatch({
            type: NEXT_BOARD,
            payload: {
                index: indexBoard,
                data: data
            }
        })
    }

    return(
            <li className="card__item">
                <Link to={`/${data.id}`}>
                    <div className="card__title">{data.title}</div>
                </Link>
                <div className="card__btns">
                    <div 
                    onClick={prevHandler}
                    className="prev-btn">
                        {indexBoard !== 0 && <SvgIcon id='arrow' width='30px' height='20px' fill='aliceblue'/>}
                    </div>
                    <div 
                    onClick={nextHandler}
                    className="next-btn">
                        {indexBoard !== 2 && <SvgIcon id='arrow' width='30px' height='20px' fill='aliceblue'/>}
                    </div>
                </div>
            </li>
    )
}

export default Card