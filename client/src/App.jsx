import './App.css'
import {Routes, Route} from 'react-router-dom';
import Login from './pages/Login'
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import Homepage from './pages/Homepage';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Homepage />} /> 

        <Route path='/login' element={<Login />} /> 
        <Route path='/register' element={<Register />} /> 
        <Route path='/dashboard' element={<Dashboard />} /> 
        <Route path='/chat/:id' element={<Chat />} /> 

      </Routes>
    </>
  )
}

export default App
