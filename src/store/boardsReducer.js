import { ADD_BOARD, ADD_CARD, CANGE_BOARD_TITLE, CHANGE_CARD, DELETE_BOARD, DELETE_CARD, NEXT_BOARD, PREV_BOARD } from "./types"


const initialState = {
    boards: []
}

export const boardsReducer = (state = initialState, action) => {
    const {type, payload} = action

    switch (type) {
        case ADD_BOARD:
            return{
                ...state,
                boards: [...state.boards, payload]
            }
        case CANGE_BOARD_TITLE:
            let foundIndex = state.boards.findIndex(board => board.id === payload.id)
            const boards = state.boards.slice()
            boards[foundIndex] = payload;

            return{
                ...state,
               boards
            }
        case ADD_CARD:
            let boardIndex = state.boards.findIndex(board => board.id === payload.boardId)
            let boardsArr = state.boards.slice()
            boardsArr[boardIndex].cards.push(payload.card)

            return{
                ...state,
                boards: boardsArr
            }
        case DELETE_CARD:
            let boardArr2 = state.boards.slice()
            boardArr2.forEach(item => {
                item.cards.forEach((el, i) => {
                    if(el.id === payload) {
                        item.cards.splice(i, 1)
                    }
                })
            })

            return{
                ...state,
                boards: boardArr2
            }
        case DELETE_BOARD:
            return{
                ...state,
                boards: [...state.boards.filter(el => el.id !== action.payload)]
            }
        case CHANGE_CARD:
            let boardArr3 = state.boards.slice()
            boardArr3.forEach(item => {
                item.cards.forEach((el, i) => {
                    if(el.id === payload.id) {
                        item.cards[i] = payload
                    }
                })
            })

            return{
                ...state,
                boards: boardArr3
            }
        case PREV_BOARD:
            let boardArr4 = state.boards.slice()
            boardArr4[payload.index].cards =  boardArr4[payload.index].cards.filter(el => el.id !== payload.data.id)
            boardArr4[payload.index - 1].cards.push(payload.data)

            return{
                ...state,
                boards: boardArr4
            }
        case NEXT_BOARD:
            let boardArr5 = state.boards.slice()
            boardArr5[payload.index].cards =  boardArr5[payload.index].cards.filter(el => el.id !== payload.data.id)
            boardArr5[payload.index + 1].cards.push(payload.data)

            return{
                ...state,
                boards: boardArr5
            }
        default:
            return state
    }
}