import ProjectForm from '../project/ProjectForm';
import styles from './NewProject.module.css';
import {useNavigate} from 'react-router-dom';

function NewProject() {

    const navigate = useNavigate();

    function createPost(project) {
        //initialize cost and services
        project.cost = 0;
        project.services = [];

        fetch("http://localhost:5000/projects", {
            method: "POST",
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify(project)
        })
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            navigate('/projects', {state:{message:'Successfully created project!'}})
        })
        .catch((error) => console.log(error));
    }

    return(
        <div className={styles.newProjectContainer}>
            <h1>Create Project</h1>
            <p>Create your project and then add the services.</p>
            <ProjectForm handleSubmit={createPost} btnText="Create Project" />
        </div>
    );
}

export default NewProject;