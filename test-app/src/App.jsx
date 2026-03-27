import './App.css';
import Header from './components/Header.jsx';
import BasicForm from './components/BasicForm.jsx';
import Wrapper from './components/Wrapper.jsx';

function App() {
  return (
    <>
      <Header />
      <Wrapper>
        <BasicForm />
      </Wrapper>
    </>
  );
}

export default App;
