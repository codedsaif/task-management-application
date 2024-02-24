import { Routes, Route } from "react-router-dom";
import Form from "./components/Form";
import NotFound from "./components/NotFound";
import Home from "./components/Home";
import Account from "./components/Account";
import UserList from "./components/UserList";
import Edit from "./components/Edit";
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
        <Route index={true} element={<UserList />} />
        <Route path="add" element={<Form />} />
        <Route path="edit/:id" element={<Edit />} />
      </Route>
      <Route path="/account" element={<Account />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
