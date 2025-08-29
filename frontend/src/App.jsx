import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import CreateTweet from './components/CreateTweet'
import ShowTweets from './components/ShowTweet'
import EditTweetPage from './components/EditTweetPage'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/tweet/create' element={<CreateTweet />}></Route>
        <Route path='/tweets' element={<ShowTweets />}></Route>
        <Route path='/tweet/edit/:id' element={<EditTweetPage />}></Route>
      </Routes>
    </>
  )
}

export default App
