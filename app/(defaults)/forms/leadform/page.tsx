// app/(defaults)/forms/leadform/page.tsx
"use client";

import React from 'react';
import LeadForm from '@/components/forms/leadform/page';

const LeadFormPage = () => {
  const handleFormClose = () => {
    console.log('Form closed');
  };

  return (
    <div>
      <h1>Lead Form</h1>
      <LeadForm onClose={handleFormClose} />
    </div>
  );
};

export default LeadFormPage;
