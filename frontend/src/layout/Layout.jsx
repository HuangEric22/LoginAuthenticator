import React from 'react'
import Header from '../components/header/Header';
import Footer from '../components/footer/footer';
import Sidebar from '../components/Sidebar';

const Layout = ({children}) => {
  return (
    <div>
        <Header />
        <Sidebar />
        <main>{children}</main>
        <Footer />
    </div>
  );
};

export default Layout