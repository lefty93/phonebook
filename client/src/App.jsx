import Header from './components/Header';
import Home from './pages/Home';
import SideBar from './components/SideBar';
import AddContactPage from './pages/AddContactPage';

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  
  return (
    <BrowserRouter>
      <div className='flex flex-col justify-center h-screen'>
        <Header />
        <div className='flex flex-grow'>
          <SideBar />
          <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/add' exact element={<AddContactPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
