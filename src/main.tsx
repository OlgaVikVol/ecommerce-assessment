import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Cart from "./pages/Cart/Cart";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Layout from "./layout/Menu/Layout.tsx";
import Product from "./pages/Product/Product.tsx";

const Menu = lazy(() => import('./pages/Menu/Menu'));

if (process.env.NODE_ENV === "development") {
    const { worker } = await import("./mocks/browser");
    worker.start({
      serviceWorker: {
        url: "/mockServiceWorker.js", 
      },
    });
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Suspense fallback={<>Loading...</>}><Menu /></Suspense>
            },
            {
                path: "/cart",
                element: <Cart />,
            },
            {
                path: "/product/:id",
                element: <Product />,
            },
        ],
    },
    {
        path: "*",
        element: <ErrorPage />,
    },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
