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

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomeLayout />}>
                <Route index element={<HomePage />} />
            </Route>

            <Route path="/auth" element={<AuthLayout />}>
                <Route path="login" element={<LoginPage />} />
                <Route path="sign-up" element={<SignUpPage />} />
                <Route path="reset-password" element={<ResetPassword />} />
            </Route>

            <Route path="/profile" element={<ProfileLayout />}>
                <Route path="my-profile/:id" element={<MyProfile />} />
                <Route path="my-profile/:id/my-goals" element={<MyGoals />} />
                <Route path="my-profile/:id/my-badges" element={<MyBadges />} />
                <Route path="user-page/:id" element={<MyPage />} />
                <Route path="daily-questions" element={<DailyQuestions />} />
                <Route path="my-results/:id" element={<MyResults />} />
                <Route path="settings" element={<SettingsPage />} />
            </Route>
            <Route path='*' element={<ErrorPage />} />
        </Routes>


    );
}

export default AppRoutes;
