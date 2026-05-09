import React, { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        'path': '/', lazy: (async () => ({
            Component: (await import('../pages/index')).default
        }))
    }
])

export default router