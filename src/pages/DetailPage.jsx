import React, { useEffect, useState } from "react"
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import SvgIcon from "../components/SvgIcon"
import { CHANGE_CARD, DELETE_CARD } from "../store/types"

const DetailPage = () => {
    const [form, setForm] = useState(false)
    const {id} = useParams()
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')

   
    const data = useSelector(s => {
        let obj
        s.boards.boards.forEach(item => {
            item.cards.forEach(item => {
                if(item.id === Number(id)) {
                    obj = item
                }
            })
        })

        return obj
    })

    useEffect(() => {
        setTitle(data.title)
        setDesc(data.desc)
    }, [])

    const deleteCard = () => {
        dispatch({
            type: DELETE_CARD,
            payload: data.id
        })

        window.location.pathname = '/'
    }

    const changeCard = () => {
        const card = {
            id: data.id,
            title: title,
            desc: desc
        }

        dispatch({
            type: CHANGE_CARD,
            payload: card
        })

        setForm(false)
    }

    return(
        <div className="detail">
           <div className="detail__top">
            <h1 className="detail-title">{data.title}</h1>
            <div className="detail-icons">
                <div 
                onClick={() => setForm(true)}
                className="detail__icon">
                    <SvgIcon 
                    fill='green'
                    width='30px'
                    height='30px'
                    id='edit' />
                </div>
                <div 
                onClick={deleteCard}
                className="detail__icon">
                    <SvgIcon 
                    fill='red'
                    width='30px'
                    height='30px'
                    id='delete' />
                </div>
            </div>
           </div>
            <p className="detail-desc">{data.desc}</p>
            {form ?
                <form
                className="form form_w_50" 
                onSubmit={e => e.preventDefault()}>
                    <div>
                        <input 
                        onChange={e => setTitle(e.target.value)}
                        value={title}
                        className="input input_mb_10" 
                         type="text" />
                        <textarea 
                        onChange={e => setDesc(e.target.value)}
                        value={desc}
                        className="textarea"></textarea>
                    </div>
                    <div className="form_btns form_btns_end">
                        <button 
                        onClick={() => setForm(false)}
                        className="button button--red button_mr_10">Отмена</button>
                        <button 
                        onClick={changeCard}
                        className="button">Изменить</button>
                    </div>
                </form>
            :
            ''
            }
        </div>
    )
}

export default DetailPage