import { Routes, Route, Navigate } from 'react-router-dom';
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
import { PrivateRoute } from './PrivateRouter';
import { PublicRoute } from './PublicRouter';
import LegalLayout from '../layout/LegalLayout';
import CookiePolicy from '../pages/legal/CookiePolicy';
import PrivacyPolicy from '../pages/legal/PrivacyPolicy';
import Terms from '../pages/legal/Terms';
import ContactUs from '../pages/home/ContactUs';
import ResetPasswordPage from '../pages/auth/resetPassword/resetPasswordPage';

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
                <Route path="reset-password" element={<PrivateRoute><ResetPassword /></PrivateRoute>} />
                <Route path='forget-password' element={<ResetPasswordPage />} />
            </Route>


            <Route path="/profile" element={<ProfileLayout />}>
                <Route index element={<Navigate to="user-page" replace />} />
                <Route path="user-page" element={<PrivateRoute><MyPage /></PrivateRoute>} />
                <Route path="my-profile/:id" element={<PrivateRoute><MyProfile /></PrivateRoute>} />
                <Route path="my-goals/:id" element={<PrivateRoute><MyGoals /></PrivateRoute>} />
                <Route path="my-badges/:id" element={<PrivateRoute><MyBadges /></PrivateRoute>} />
                <Route path="daily-questions" element={<PrivateRoute><DailyQuestions /></PrivateRoute>} />
                <Route path="my-results/:id" element={<PrivateRoute><MyResults /></PrivateRoute>} />
                <Route path="settings" element={<PrivateRoute><SettingsPage /></PrivateRoute>} />
            </Route>


            <Route path='/legal' element={<LegalLayout />}>
                <Route path='cookie-policy' element={<CookiePolicy />} />
                <Route path='privacy-policy' element={<PrivacyPolicy />} />
                <Route path='terms-of-service' element={<Terms />} />
            </Route>

            <Route path='*' element={<ErrorPage />} />
        </Routes>


    );
}

export default AppRoutes;
