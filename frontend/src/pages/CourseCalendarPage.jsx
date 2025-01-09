import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import React, { useState } from "react";
import Layout from '../layout/Layout';
import WeeklyCalendar from '../components/calendar/WeeklyCalendar';

const CourseCalendarPage = () => {
  return (
    <Layout>
      <WeeklyCalendar />
    </Layout>
  );
};

export default CourseCalendarPage