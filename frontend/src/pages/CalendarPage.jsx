import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import React, { useState } from "react";
import Layout from '../layout/Layout';
import { getMonth } from '../utils/getTime';
import MonthlyCalendar from '../components/calendar/MonthlyCalendar';

const CalendarPage = () => {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  return (
    <Layout>
        <MonthlyCalendar />
    </Layout>
  );
};

export default CalendarPage