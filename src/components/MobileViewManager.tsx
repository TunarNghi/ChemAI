"use client";

import React from 'react';
import { Box } from '@mui/material';

interface MobileViewManagerProps {
  children: React.ReactNode;
  currentTab: number;
  onNavigateTab: (tabIndex: number) => void;
  isTeacher?: boolean;
}

export default function MobileViewManager({
  children,
}: MobileViewManagerProps) {
  return (
    <Box sx={{ width: '100%', maxWidth: '100%', overflowX: 'hidden', position: 'relative', boxSizing: 'border-box' }}>
      {children}
    </Box>
  );
}
