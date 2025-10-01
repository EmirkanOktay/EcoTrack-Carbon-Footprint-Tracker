import { Routes, Route } from 'react-router-dom';
import HomeLayout from '../layout/HomeLayout';
import HomePage from '../pages/home/HomePage';
import AuthLayout from '../layout/AuthLayout';
import LoginPage from '../pages/auth/login/LoginPage';
import ResetPassword from '../pages/auth/resetPassword/ResetPassword';
import ProfileLayout from '../layout/ProfileLayout';
import MyProfile from '../pages/profile/MyProfile';
import MyPage from '../pages/profile/MyPage';
import DailyQuestions from '../pages/profile/DailyQuestions';
import MyResults from '../pages/profile/MyResults';
import MyBadges from '../pages/profile/MyBadges';
import SettingsPage from '../pages/settings/SettingsPage';
import MyGoals from '../pages/profile/myGoals';
import ErrorPage from '../pages/Error';
import SignUpPage from '../pages/auth/sign-up/SignUp';
import ContactUs from '../components/ContactUs';
import { PrivateRoute } from './PrivateRouter';
import { PublicRoute } from './PublicRouter';

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomeLayout />}>
                <Route index element={<PublicRoute><HomePage /></PublicRoute>} />
                <Route path='contact' element={<ContactUs />} />
            </Route>

            <Route path="/auth" element={<AuthLayout />}>
                <Route path="login" element={<PublicRoute><LoginPage /></PublicRoute>} />
                <Route path="sign-up" element={<PublicRoute><SignUpPage /></PublicRoute>} />
                <Route path="reset-password" element={<ResetPassword />} />
            </Route>

            <Route path="/profile" element={<ProfileLayout />}>
                <Route path="my-profile/:id" element={<PrivateRoute><MyProfile /> </PrivateRoute>} />
                <Route path="my-profile/:id/my-goals" element={<PrivateRoute><MyGoals /></PrivateRoute>} />
                <Route path="my-profile/:id/my-badges" element={<PrivateRoute><MyBadges /></PrivateRoute>} />
                <Route path="user-page/:id" element={<PrivateRoute><MyPage /></PrivateRoute>} />
                <Route path="daily-questions" element={<PrivateRoute><DailyQuestions /></PrivateRoute>} />
                <Route path="my-results/:id" element={<PrivateRoute><MyResults /></PrivateRoute>} />
                <Route path="settings" element={<PrivateRoute><SettingsPage /></PrivateRoute>} />
            </Route>
            <Route path='*' element={<ErrorPage />} />
        </Routes>


    );
}

export default AppRoutes;
