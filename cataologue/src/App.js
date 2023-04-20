
import './App.css';
import {RegistrationForm} from './components/page1';
import { Route, Routes } from 'react-router';
import { ConfirmationPage } from './components/page2';
function App() {
  return (
    <Routes>
    <Route exact path="/" element={<RegistrationForm/>} />
    <Route path="/confirmation" element={<ConfirmationPage/>} />
  </Routes>
  );
}

export default App;
