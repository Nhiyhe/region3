import "./App.css";
import Routes from "./Routes";
import Navbar from "./components/Navbar";
import AuthProvider from "./context/AuthContext";
import ParishAuthProvider from "./context/ParishAuthContext";
import Footer from './components/Footer';

import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import ProvinceContextProvider from "./context/ProvinceContext";

const App = () => {

  const options = {
    timeout: 5000,
    position: positions.BOTTOM_CENTER
  };

  return (
    <div className="App">
      <AuthProvider>
        <ParishAuthProvider>
          <Provider template={AlertTemplate} {...options}>
            <ProvinceContextProvider>
              <div className="App-container">
                  <Navbar />
                    <div className="">
                      <div className="App-content">
                        <Routes />
                      </div>
                    </div>
                  <Footer/>
              </div>
            </ProvinceContextProvider>
            </Provider>
        </ParishAuthProvider>
      </AuthProvider>
    </div>
  );
};

export default App;
