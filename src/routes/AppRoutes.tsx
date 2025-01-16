import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import PersonPage from "@/pages/PersonPage";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* 루트 - person 목록 페이지 */}
        <Route path={ROUTES.ROOT} element={<PersonPage />} />
      </Routes>
    </Router>
  );
}
