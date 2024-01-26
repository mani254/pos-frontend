import './css/common.css';

import {Routes,Route} from 'react-router-dom';
import Dashboard from './components/dashboard';
import Navbar from './components/navbar';
import LoginPage from './components/loginPage';

function App() {
  return (
    <div className="App light-theme">
      {/* <Navbar/> */}
      
      <Routes>
        <Route path="/" element={<Dashboard/>}></Route>
        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
      </Routes>
    </div>
  );
}

export default App;
