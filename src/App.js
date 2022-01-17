import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/pages/Home';
import Contact from './components/pages/Contact';
import Company from './components/pages/Company';
import Container from './components/layout/Container';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Projects from './components/pages/Projects';
import NewProject from './components/pages/NewProject';
import Project from './components/pages/Project';

function App() {
  return (
    <Router>
      <Navbar />
      <Container customClass="minHeight">
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route path="/projects" element={<Projects/>}/>
          <Route path="/newproject" element={<NewProject/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/company" element={<Company/>}/>
          <Route path="/project/:id" element={<Project/>}/>
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
