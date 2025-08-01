import {
    BrowserRouter as Router,
    Routes, Route, Navigate,
    useLocation
} from 'react-router-dom';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute'
import Home from './pages/home';
import Profile from './pages/Profile'
import { Sidebar } from './components/Sidebar';
import Header from './components/Header';
// import { darkTheme } from './theme';
import { useState } from 'react';
import styled from "@emotion/styled";
import { ProfileBar } from './components/ProfileBar';




const AppLayout = ({ children }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [isProfileOpen, setProfileOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(o => !o);
    const toggleProfilebar = () => setProfileOpen(o => !o);

    return (
        <>
            <Header toggleSidebar={toggleSidebar}
                toggleProfilebar={toggleProfilebar} />
            <ProfileBar isOpen={isProfileOpen} />
            <Main>
                <Sidebar isOpen={isSidebarOpen} />
                <Content>
                    {children}
                </Content>

            </Main>

            {/* <ContainerWrapper>
                left = {isSidebarOpen ? 240 : 0}
            </ContainerWrapper> */}
        </>
    )
}
const Main = styled.main`
    display: flex;
`

const Content = styled.div`
    flex: 1;
`

// const ContainerWrapper = styled.div`
//     margin-left: ${props => props.left}px;
// `

function App() {

    // const [theme, darkTheme] = useState(darkTheme)
    const location = useLocation();
    const isAuthRoute = location.pathname.startsWith('/auth');

    return (
        //  <ThemeProvider theme = {theme} >
        <AuthProvider>

            {isAuthRoute
                ? <Routes>
                    <Route path='/auth/login' element={<SignIn />} />
                    <Route path='/auth/register' element={<SignUp />} />
                    <Route path='*' element={<Navigate to={'/auth/login'} replace />} />
                </Routes>
                : <AppLayout>
                    <Routes>
                        <Route path='/profile' element={<Profile />} />
                        <Route path="*" element={<Navigate to="/profile" replace />} />
                    </Routes>
                </AppLayout>}
        </AuthProvider>



        //   </ThemeProvider>

    );
}

export default function Root() {
    return (
        <Router>
            <App />
        </Router>
    );
}


// <Router>
//     <AuthProvider>
//         <main>
//             <Routes>
//                 <Route path="/home" element={<Home />} />
//                 <Route path="/auth/login" element={<SignIn />} />
//                 <Route path='/auth/register' element={<SignUp />} />
//                 <Route path="/profile" element={
//                     <PrivateRoute>
//                         <Profile />
//                     </PrivateRoute>
//                 } />

//                 <Route path="*" element={<Navigate to="/home" replace />} />
//             </Routes>
//         </main>
//     </AuthProvider>

// </Router>