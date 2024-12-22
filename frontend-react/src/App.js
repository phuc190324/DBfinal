import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'; // Sử dụng Routes thay cho Route
import useSWR from 'swr';

// Import các trang từ thư mục pages
import Login from './pages/Login';
import ListService from './pages/ListService';
import ListRoom from './pages/ListRoom';
import UserProfile from './pages/UserProfile';

const fetcher = (...args) => fetch(...args).then(res => res.json());

function Room(props) {
  return <li> Room {props.info.room_id}: {props.info.name}, price: {props.info.price}</li>;
}

function App() {
  var api = "https://vigilant-system-9pg74q45p97cx7vr-8080.app.github.dev/room";
  const { data, error, isLoading } = useSWR(api, fetcher);

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  return (
    <Router> {/* Bọc toàn bộ ứng dụng trong Router */}
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h3>Welcome to the Home Page</h3>

          {/* Các liên kết điều hướng tới các trang */}
          <nav>
            <ul>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/listservice">List Service</Link></li>
              <li><Link to="/listroom">List Room</Link></li>
              <li><Link to="/userprofile">User Profile</Link></li>
            </ul>
          </nav>

          <ul>
            {data.rooms.map((item) => <Room key={item.room_id} info={item} />)}
          </ul>
        </header>

        {/* Cấu hình các Route cho các trang */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/listservice" element={<ListService />} />
          <Route path="/listroom" element={<ListRoom />} />
          <Route path="/userprofile" element={<UserProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
