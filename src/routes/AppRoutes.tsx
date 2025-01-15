import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import UserPage from "@/pages/PersonPage";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* 루트 - 유저 목록 페이지 */}
        <Route path={ROUTES.ROOT} element={<UserPage />} />
      </Routes>
    </Router>
  );
}
