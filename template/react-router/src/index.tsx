import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import router from './router';

createRoot(document.getElementById('root') as HTMLElement).render(<RouterProvider router={router} />);
