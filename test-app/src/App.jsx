import './App.css';
import Header from './components/Header.jsx';
import BasicForm from './components/BasicForm.jsx';
import Wrapper from './components/Wrapper.jsx';
import ReactLive from './components/ReactLive.jsx';
import MarkDownTest from './components/MarkDownTest.jsx';
function App() {
  return (
    <>
      <Header />
      <Wrapper>
        {/* <MarkDownTest /> */}
        <ReactLive />
        <BasicForm />
      </Wrapper>
    </>
  );
}

export default App;
