'use client';

import React from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import FeaturedDishes from '@/components/home/FeaturedDishes';
import AboutSection from '@/components/home/AboutSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import ReservationCta from '@/components/home/ReservationCta';

const HomeClient = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturedDishes />
      <AboutSection />
      <TestimonialsSection />
      <ReservationCta />
    </Layout>
  );
};

export default HomeClient; 