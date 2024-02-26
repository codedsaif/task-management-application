import { useEffect, useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import CreateTask from "./components/CreateTask";
import NotFound from "./components/NotFound";
import Home from "./components/Home";
import Account from "./components/Account";
import TaskListFun from "./components/TaskListFun";
import EditTask from "./components/EditTask";
import ProtectedRoute from "./components/ProtuctedRoute";
import { useSelector } from "react-redux";
// import { io } from "socket.io-client";

function App() {
  // const socket = useMemo(() => io(`${process.env.REACT_APP_API_BASE_URL}`), []);
  // const socket = io(`${process.env.REACT_APP_API_BASE_URL}`);
  const socket = useSelector((store) => store.socket);
  let isSocketConnected = false;
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected", socket.id);
      isSocketConnected = true;
      // socket.on("welcome", (s) => {
      //   console.log(s);
      // });
      // socket.on("welcomeOthers", (s) => {
      //   console.log(s);
      // });

      // socket.on("receiving-message", (data) => {
      //   console.log("receiving-message", data);
      // });

      // const joinRoomHandler = () => {
      //   socket.emit("join-room", "any-group-name");
      // };
      // return () => {
      //   socket.disconnect();
      // };
    });
    return () => {
      if (isSocketConnected) {
        socket.disconnect();
      }
    };
  }, [socket]);
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
