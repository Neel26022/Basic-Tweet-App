import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import CreateTweet from './components/CreateTweet'
import TweetAnalytics from './components/TweetAnalytics'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/createtweet' element={<CreateTweet />}></Route>
        <Route path='/tweet-analytics' element={<TweetAnalytics />}></Route>
      </Routes>
    </>
  )
}

export default App
