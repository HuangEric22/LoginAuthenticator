import React from 'react'
import Header from '../components/header/Header';
import Footer from '../components/footer/footer';

const Layout = ({children}) => {
  return (
    <div>
        <Header />
        <main>{children}</main>
        <Footer />
    </div>
  );
};

export default Layout