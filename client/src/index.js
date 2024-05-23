import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import loadUser from './components/auth/loadUser';

// 맨 앞에서 유저의 토큰을 확인한다면 useEffect로 하는거 보다 살짝더 빠르다
loadUser()

// App이 BrowserRouter 안에 있어야 Link를 사용가능하다
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
