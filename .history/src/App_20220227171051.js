import { Routes, Route } from 'react-router-dom';

import Header from './Components/Header';
import Home from './Components/Home';
import Login from './Components/Login';
function Login() {
  return(
      <div>
          <h1>LOGIN PAGE</h1>
      </div>
  )
}

export default Login;


import './App.css';

function App() {
	return (
		<div className="App">
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
			</Routes>
		</div>
	);
}

export default App;
