import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom'; 
import { Button, Dropdown, Modal } from 'antd'; 
import { UserOutlined, KeyOutlined, LogoutOutlined } from '@ant-design/icons'; 

const Header = () => {
  const navigate = useNavigate(); // Khai báo hook `useNavigate` để điều hướng người dùng trong ứng dụng.

  // Lấy thông tin người dùng đã đăng nhập từ localStorage
  const userLogin = JSON.parse(localStorage.getItem("userLocal"));

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("userLocal"); 
    navigate('/'); 
  }

  // Hàm xử lý hiển thị modal xác nhận trước khi đăng xuất
  const handleConfirmLogout = () => {
    Modal.confirm({
      title: "Xác nhận", 
      content: "Bạn chắc chắn muốn đăng xuất?",
      onOk() {
        handleLogout(); 
      },
      cancelText: "Hủy bỏ", 
      okText: "Đăng xuất", 
    });
  };

  // Các item trong menu dropdown của người dùng
  const items = [
    {
      key: '1',
      label: (
        <Link to="/profile"> 
          <UserOutlined className='mr-2' /> 
          Thông tin tài khoản
        </Link>
      ),
    },
    {
      key: '2',
      label: (
        <Link to="/change-password"> 
          <KeyOutlined className='mr-2' /> 
          Đổi mật khẩu
        </Link>
      ),
    },
    {
      key: '3',
      label: (
        <button onClick={handleConfirmLogout} className='link-button'> 
          <LogoutOutlined className='mr-2' /> 
          Đăng xuất
        </button>
      ),
    },
  ];

  return (
    <>
      <div className="w-full h-24 flex items-center justify-between px-10">
        <div className="flex gap-6">
          <NavLink to="/home" className="text-2xl text-black font-bold">
            MQCoder
          </NavLink>
          <NavLink to="/weather" className="text-xl text-black">
            Weather
          </NavLink>
          <NavLink to="/worklist" className="text-xl text-black">
            Worklist
          </NavLink>
        </div>
        <div className="flex gap-6">
          <Dropdown menu={{ items }} placement="bottom" arrow>
            <Button className="border-none shadow-none h-12 text-xl text-black hover:text-gray-600">
              <img
                className="rounded-full"
                height={40}
                width={40}
                src={userLogin.image}
                alt="avt"
              />
              {userLogin.userName} 
            </Button>
          </Dropdown>
        </div>
      </div>
    </>
  );
};

export default Header; 
