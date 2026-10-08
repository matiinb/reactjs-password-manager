import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext"
import PrivateRoute from './PrivateRoute'
import Layout from './Layout'
import Login from './Login'
import Signup from './Signup'
import Dashboard from './Dashboard'
import New from './New'
import NoPage from './NoPage'
import {DataStoreProvider} from "../contexts/DataContext";

function App() {
  return (
    <BrowserRouter>
        <AuthProvider>
            <DataStoreProvider>
                <Routes>
                    <Route path='/' element={<Layout />}>
                        <Route
                            index
                            element={
                                <PrivateRoute beLoggedIn={true}>
                                    <Dashboard/>
                                </PrivateRoute>
                            }
                        />

                        <Route
                            path='login'
                            element={
                                <PrivateRoute beLoggedIn={false}>
                                    <Login/>
                                </PrivateRoute>
                            }
                        />

                        <Route
                            path='signup'
                            element={
                                <PrivateRoute beLoggedIn={false}>
                                    <Signup/>
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path='new'
                            element={
                                <PrivateRoute beLoggedIn={true}>
                                    <New/>
                                </PrivateRoute>
                            }
                        />

                        <Route path='*' element={<NoPage/>} />
                    </Route>
                </Routes>
            </DataStoreProvider>
        </AuthProvider>
    </BrowserRouter>
  )
}

export default App