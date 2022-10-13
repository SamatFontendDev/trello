import React, {useEffect, useState} from "react"
import Card from "./Card"
import SvgIcon from "./SvgIcon"
import {useDispatch} from 'react-redux'
import {ADD_CARD, CANGE_BOARD_TITLE, DELETE_BOARD} from '../store/types'

const Board = ({data, index}) => {
    const [input, setInput] = useState(false)
    const [form, setForm] = useState(false)
    const [title, setTitle] = useState('')
    const [cardTitle, setCardTitle] = useState('')
    const [cardDesc, setCardDesc] = useState('')
    const dispatch = useDispatch()

    const changeTitile = () => {
        if(!title.length) {
            setInput(false)
            return
        }

        dispatch({
            type: CANGE_BOARD_TITLE,
            payload: {
                id: data.id,
                title: title,
                cards: data.cards,
            }
        })

        setInput(false)
    }

    const addCard = () => {
        if(!cardTitle.length || !cardDesc.length) {
            alert('Заполните форму')

            return
        }

        const card = {
            id: Date.now(),
            title: cardTitle,
            desc: cardDesc
        }

        dispatch({
            type: ADD_CARD,
            payload: {
                boardId: data.id,
                card: card
            }
        })

        setCardTitle('')
        setCardDesc('')
        setForm(false)
    }

    const boardDelete = () => {
        dispatch({
            type: DELETE_BOARD,
            payload: data.id
        })
    }

    useEffect(() => {
        setTitle(data.title)
    }, [])
 
    return(
        <div className="board">
            <div className="board__top">
                {input ?
                <div className="input-wrap">
                    <input 
                    onChange={e => setTitle(e.target.value)}
                    value={title}
                    className="input"/>
                    <div className="input-icons">
                        <div onClick={() => setInput(false)}>
                            <SvgIcon  
                            id='close' 
                            fill='red' 
                            width='15px' 
                            height='15'/>
                        </div>
                        <div
                        onClick={changeTitile}
                        className="icon-done"
                        >
                            <SvgIcon  
                            id='done' 
                            fill='red' 
                            width='15px' 
                            height='15'/>
                        </div>
                    </div>
                </div> :
                <div 
                onClick={() => setInput(true)}
                className="board__title">{data.title.length === 0 ? 'Введите название' : data.title}</div>
                }
            </div>
           
            <ul className="cards__list">
                {data.cards.map(item => <Card indexBoard={index} key={item.id} data={item} />)}
            </ul>
            {form ? 
            <form 
            onSubmit={e => e.preventDefault()}
            className="form">
                <input 
                onChange={e => setCardTitle(e.target.value)}
                value={cardTitle}
                className="input input_mb_10" 
                placeholder="Название" type="text" />
                <textarea 
                placeholder="Описание"
                value={cardDesc}
                onChange={e => setCardDesc(e.target.value)}
                className="textarea"></textarea>
                <div className="form__btns">
                    <button 
                    onClick={() => setForm(false)}
                    className="button button--red">Отмена</button>
                    <button 
                    onClick={addCard}
                    className="button">Добавить</button>
                </div>
            </form>
            :
            <div 
            className="board__bottom">
                <div 
                onClick={boardDelete}
                className="board-delete">
                    <SvgIcon id='delete' width='20px' height='20px' fill='red'/>
                </div>
                 <button 
                    onClick={() => setForm(true)}
                    className="button button--card">Добавить задачу +</button>
            </div>
            }
        </div>
    )
}

export default Board