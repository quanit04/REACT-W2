import React, { useState } from 'react';
import { Button, Input } from 'antd'; 
import { Link } from 'react-router-dom'; 
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth'; 
import { auth, provider } from '../../firebase/firebase.config'; 
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState(''); 
  const navigate = useNavigate(); 

  // Hàm đăng nhập bằng Google
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider) 
      .then(response => {
        console.log(response);
        const userLocal = {
          email: response.user.email,
          userName: response.user.displayName,
          image: response.user.photoURL,
          userId: response.user.uid
        };
        // Lưu thông tin người dùng vào localStorage
        localStorage.setItem('userLocal', JSON.stringify(userLocal));
        navigate("/home");
      })
      .catch(error => {
        console.log(error); 
      });
  };

  // Hàm đăng nhập bằng Email và Mật khẩu
  const signInWithEmailPassword = () => {
    if (!email || !password) {
      setError('Email và mật khẩu không được để trống.'); 
      return;
    }

    signInWithEmailAndPassword(auth, email, password) 
      .then(response => {
        console.log(response);
        const userLocal = {
          email: response.user.email,
          userName: response.user.displayName,
          image: response.user.photoURL,
          userId: response.user.uid
        };
        // Lưu thông tin người dùng vào localStorage
        localStorage.setItem('userLocal', JSON.stringify(userLocal));
        navigate("/home");
      })
      .catch(error => {
        setError('Email hoặc mật khẩu không đúng.'); 
        console.log(error);
      });
  };

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <form className='p-6 border rounded w-1/4' onSubmit={(e) => { e.preventDefault(); signInWithEmailPassword(); }}>
        <h2 className='text-center text-3xl text-black font-bold'>Đăng nhập</h2>
        <div className='mb-4'>
          <label htmlFor='email' className='text-black'>Email</label>
          <Input
            id='email'
            className='mt-2'
            placeholder='Nhập địa chỉ email'
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Cập nhật state khi người dùng nhập email.
          />
        </div>
        <div>
          <label htmlFor='password' className='text-black'>Mật khẩu</label>
          <Input
            id='password'
            className='my-2'
            placeholder='Nhập mật khẩu'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Cập nhật state khi người dùng nhập mật khẩu.
          />
        </div>
        {error && <div className='mt-1 text-red-600'>{error}</div>}
        <div className='w-full flex items-center justify-center gap-2'>
          <Button className='w-full' type='primary' onClick={signInWithEmailPassword}>Đăng nhập</Button>
        </div>
        <div className='text-center my-3 text-zinc-900'>
          <span>Hoặc</span>
        </div>
        <div>
          <Button onClick={signInWithGoogle} className='w-full flex items-center justify-center gap-2'>
            <img
              src='https://yt3.googleusercontent.com/viNp17XpEF-AwWwOZSj_TvgobO1CGmUUgcTtQoAG40YaYctYMoUqaRup0rTxxxfQvWw3MvhXesw=s900-c-k-c0x00ffffff-no-rj'
              alt='gg'
              height={20}
              width={20}
            />
            Đăng nhập với Google
          </Button>
        </div>
        <div className='text-center mt-3 text-black'>
          Bạn chưa có tài khoản?
          <Link to="/register"> Đăng ký</Link>
        </div>
      </form>
    </div>
  );
};

export default Login; 
