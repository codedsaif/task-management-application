import { Routes, Route } from "react-router-dom";
import CreateTask from "./components/CreateTask";
import NotFound from "./components/NotFound";
import Home from "./components/Home";
import Account from "./components/Account";
import TaskListFun from "./components/TaskListFun";
import EditTask from "./components/EditTask";
import ProtectedRoute from "./components/ProtuctedRoute";
function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      >
        <Route index={true} element={<TaskListFun />} />
        <Route path="add" element={<CreateTask />} />
        <Route path="edit/:id" element={<EditTask />} />
      </Route>
      <Route path="/account" element={<Account />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
