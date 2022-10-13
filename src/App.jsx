import { Route, Routes } from "react-router-dom"
import DetailPage from "./pages/DetailPage"
import MainPage from './pages/MainPage'

const App = () => {
    return(
        <Routes>
            <Route path="/" element={<MainPage/>} />
            <Route path="/:id" element={<DetailPage/>} />
        </Routes>
    )
}

export default App