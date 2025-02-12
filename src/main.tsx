import { lazy, StrictMode, Suspense, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
    createBrowserRouter,
    RouterProvider,
    useLocation,
} from "react-router-dom";
import Cart from "./pages/Cart/Cart";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Layout from "./layout/Menu/Layout.tsx";
import Product from "./pages/Product/Product.tsx";
import AuthLayout from "./layout/Auth/AuthLayout.tsx";
import Login from "./pages/Login/Login.tsx";
import Register from "./pages/Register/Register.tsx";
import { RequireAuth } from "./shared/helpers/RequireAuth.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import Success from "./pages/Success/Success.tsx";
import { initGA, logPageView } from "./utils/analytics.ts";

const Menu = lazy(() => import("./pages/Menu/Menu"));

initGA();

if (process.env.NODE_ENV === "development") {
    const { worker } = await import("./mocks/browser");
    worker.start({
        serviceWorker: {
            url: "/mockServiceWorker.js",
        },
    });
}

const TrackPageView = () => {
    const location = useLocation();

    useEffect(() => {
        logPageView();
    }, [location]);

    return null;
};

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <RequireAuth>
                <Layout />
                <TrackPageView />
            </RequireAuth>
        ),
        children: [
            {
                path: "/",
                element: (
                    <Suspense fallback={<>Loading...</>}>
                        <Menu />
                    </Suspense>
                ),
            },
            {
                path: "/success",
                element: <Success />,
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
        path: "/auth",
        element: <AuthLayout />,
        children: [
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
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
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </StrictMode>
);
