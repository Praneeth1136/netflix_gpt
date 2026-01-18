
import './App.css'
import Body from './components/Body';
import Header from './components/Header';
import {Provider} from "react-redux";
import appStore from "./utils/appStore";

function App() {

  return (
    <>
      {/* <h1 className="text-3xl font-blod text-green-800">Hello Everyone</h1> */}
      {/* <Header/> */}
      <Provider store={appStore}><Body/></Provider>
    </>
  )
}

export default App
