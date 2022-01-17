import Message from "../layout/Message";
import {useLocation} from 'react-router-dom';
import styles from './Projects.module.css';
import Container from '../layout/Container';
import LinkButton from '../layout/LinkButton';
import ProjectCard from "../project/ProjectCard";
import { useState, useEffect } from "react";
import Loading from '../layout/Loading';

function Projects() {
    const [ projects, setProjects ] = useState([]);
    const [ removeLoading, setRemoveLoading] = useState(false);
    const [ projectMessage, setProjectMessage] = useState('');
    const location = useLocation();

    let message = '';
    if (location.state) {
        message = location.state.message;
    }

    useEffect(() => {
        fetch('http://localhost:5000/projects', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then((data) => {
            setProjects(data);
            setRemoveLoading(true);
        })
        .catch((error) => console.log(error))
    }, []);

    function removeProject(id) {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(() => {
            setProjects(projects.filter((project) => project.id !== id));
            setProjectMessage('Project removed successfully!')
        })
        .catch(error => console.log(error));
    }

    return(
        <div className={styles.projectContainer}>
            <div className={styles.titleContainer}>
                <h1>My projects</h1>
                <LinkButton to="/newproject" text="New Project"/>
            </div>
            {message && <Message text={message} type="success" />}
            {projectMessage && <Message text={message} type={projectMessage} />}
            <Container customClass="start">
                {projects.length > 0 &&
                    projects.map((project) => 
                        <ProjectCard
                            id={project.id}
                            key={project.id}
                            name={project.name}
                            budget={project.budget}
                            category={project.category.name}
                            handleRemove={removeProject}
                        />
                    )
                }
                {!removeLoading && <Loading />}
                {removeLoading && projects.length === 0 && (
                    <p>No projects were found.</p>
                )}

            </Container>
        </div>
    );
}

export default Projects;