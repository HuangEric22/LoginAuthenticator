import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import React, { useState } from "react";
import Layout from '../layout/Layout';
import getMonth from '../utils/getMonth';
import Month from '../components/Month'
import Sidebar from '../components/Sidebar'

const CourseCalendarPage = () => {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  return (
    <Layout>
        <React.Fragment>
          <div className='h-[80vh] w-[80vw] flex flex-col'>
              <p className='font-body'>Course Planner</p>
              <div className='flex flex-1'>
                <Sidebar />
                <Month month={currentMonth}/>
              </div>
          </div>
        </React.Fragment>
    </Layout>
  );
};

export default CourseCalendarPage