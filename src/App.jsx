import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Front from './components/Front';
import AppBar from './components/Appbar';
import { Provider } from 'react-redux'
import { store } from './store/store';
import Dashboard from './components/Dashboard';
import InterviewForm from './components/InterviewForm';
import Notification from './components/Notification';
function App() {


  return (


    <>

      <Provider store={store}>
        <Router >

          <AppBar></AppBar>
          <Notification></Notification>
          <Routes>
            <Route path="/" element={<Front></Front>} />
            <Route path="/Dashboard" element={<Dashboard></Dashboard>}></Route>
            <Route path="/schedule" element={<InterviewForm />} />
            <Route path="/edit/:id" element={<InterviewForm />} />
          </Routes>
        </Router>
      </Provider>
    </>
  )
}

export default App
