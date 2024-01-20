import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "@/App";
import NotFound from "@/components/NotFound";
import HomePage from "../pages/home";
import ResultQuestionDetailPage from "../pages/result_detail";

function MainRouters() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/result" element={<ResultQuestionDetailPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default MainRouters;
