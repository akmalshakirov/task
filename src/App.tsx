import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/loader";
import CreateUser from "./pages/createUser";
import EditUser from "./pages/userEdit";
const Layout = lazy(() => import("./layout/index"));
const Users = lazy(() => import("./pages/users"));

function App() {
    return (
        <Suspense fallback={<Loader />}>
            <Toaster />
            <Layout>
                <Routes>
                    <Route path='/' element={<Users />} />
                    <Route path='/create' element={<CreateUser />} />
                    <Route path='/edit/:id' element={<EditUser />} />
                </Routes>
            </Layout>
        </Suspense>
    );
}

export default App;
