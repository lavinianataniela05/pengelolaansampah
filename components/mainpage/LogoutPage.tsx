"use client";
import React, { use, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const LogoutPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // Clear auth tokens, cookies, or localStorage here
    // For example:
    localStorage.removeItem('token');

    // Redirect to login or home page
    router.push('/login');
  }, [router]);

  return <div>Logging out...</div>;
};

export default LogoutPage;
