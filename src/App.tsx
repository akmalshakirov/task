import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
const Layout = lazy(() => import("./layout/index"));
import CreateUser from "./pages/createUser";
import EditUser from "./pages/userEdit";
import Users from "./pages/users";
import Loader from "./components/loader";

function App() {
    return (
        <Suspense fallback={<Loader />}>
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
