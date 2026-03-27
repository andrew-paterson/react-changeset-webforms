import './App.css';
import Header from './components/Header.jsx';
import BasicForm from './components/BasicForm.jsx';
import Wrapper from './components/Wrapper.jsx';
import ReactLive from './components/ReactLive.jsx';

function App() {
  return (
    <>
      <Header />
      <Wrapper>
        <ReactLive />
        <BasicForm />
      </Wrapper>
    </>
  );
}

export default App;
