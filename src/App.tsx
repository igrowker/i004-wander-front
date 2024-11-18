import "./App.css";
import AppRoutes from "./routes/AppRoutes";

import Home from "./components/Home/homePage";
function App() {
  return (
    <>
      <AppRoutes />
      {/* <h1>Wander</h1> */}

      <Home />
    </>
  );
}

export default App;
