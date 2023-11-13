import './App.css';
import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.esm';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import { CartProvider } from './components/ContextReducer';
import MyOrder from './screens/MyOrder';
function App() {
  return (
    <>
    <CartProvider>
    <Router>
      
        <Routes>
          <Route exact path="/" element={<Home></Home>} />
          <Route exact path="/login" element={<Login></Login>} />
          <Route exact path="/signup" element={<Signup></Signup>} />
          <Route exact path="/myOrder" element={<MyOrder></MyOrder>} />
        </Routes>
      
    </Router>
    </CartProvider>
    </>
  );
}

export default App;
