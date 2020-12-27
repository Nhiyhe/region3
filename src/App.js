import "./App.css";
import Routes from "./Routes";
import Navbar from "./components/Navbar";
import AuthProvider from "./context/AuthContext";
import ParishProvider from "./context/ParishContext";
import Footer from './components/Footer';
const App = () => {
  return (
    <div className="App">
      <AuthProvider>
        <ParishProvider>
          <div className="App-container">
              <Navbar />
                <div className="">
                  <div className="App-content">
                    <Routes />
                  </div>
                </div>
              <Footer/>
          </div>
        </ParishProvider>
      </AuthProvider>
    </div>
  );
};

export default App;
