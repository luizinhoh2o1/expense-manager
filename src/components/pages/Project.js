import styles from './Project.module.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loading from '../layout/Loading';
import Container from '../layout/Container';
import ProjectForm from '../project/ProjectForm';
import Message from '../layout/Message';
import ServiceForm from '../services/ServiceForm';
import { v4 as uuidv4 } from 'uuid';
import ServiceCard from '../services/ServiceCard';

function Project() {

    let { id } = useParams();
    const [ project, setProject ] = useState([]);
    const [ showProjectForm, setShowProjectForm ] = useState(false);
    const [ showServiceForm, setShowServiceForm ] = useState(false);
    const [ message , setMessage ] = useState();
    const [ type , setType ] = useState();
    const [ services, setServices] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: "GET",
            header: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((data) => {
            setProject(data);
            setServices(data.services);
        })
        .catch(error => console.log(error));
    }, [id]);

    function toggleProjectForm() {
            setShowProjectForm(!showProjectForm);
            setMessage();
            setType();
    }

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm);
    }

    function createService(project) {
        setMessage('');
        
        const lastService = project.services[project.services.length -1];
        lastService.id = uuidv4();

        const lastServiceCost = lastService.cost;

        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);

        if (newCost > parseFloat(project.budget)) {
            setMessage('Outdated budget, check the values!');
            setType('error');
            project.services.pop();
            return false;
        }

        project.cost = newCost;

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
        .then((response) => response.json())
        .then((data) => {
            setServices(data.services);
            setShowServiceForm(!showServiceForm);
            setMessage('Added service!');
            setType('success');
        })
        .catch((error) => console.log(error));
    }

    function editPost(project) {
        //budget validation

        if (project.budget < project.cost) {
            setMessage('The budget cannot be less than the cost of the project.');
            setType('error');
            return false;
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
        .then((response) => response.json())
        .then((data) => {
            setProject(data);
            setShowProjectForm(false);
            setMessage('Updated project!');
            setType('success');
        })
        .catch((error) => console.log(error));
    }

    function removeService(id, cost) {
        const servicesUpdated = project.services.filter(
            (service) => service.id !== id
        );

        const projectUpdated = project;

        projectUpdated.services = servicesUpdated;
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost);
            
        fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectUpdated)
        })
        .then((response) => response.json())
        .then(() => {
            setProject(projectUpdated);
            setServices(servicesUpdated);
            setMessage('Service has been successfully removed!');
            setType('success');
        })
        .catch((error) => console.log(error));
    }

    return(
        <>
            {project.name ? (
                <div className={styles.projectDetails}>
                    <Container customClass="column">
                        {message && <Message type={type} text={message} />}
                        <div className={styles.detailsContainer}>
                            <h1>Projeto: {project.name}</h1>
                            <button onClick={toggleProjectForm} className={styles.btn}>
                                {!showProjectForm ? 'Edit project' : 'Close'}
                            </button>
                            {!showProjectForm ? (
                                <div className={styles.projectInfo}>
                                    <p>
                                        <span>Category: </span> {project.category.name}
                                    </p>
                                    <p>
                                        <span>Total of budget: </span> ${project.budget}
                                    </p>
                                    <p>
                                        <span>Total used: </span> ${project.cost}
                                    </p>
                                </div>
                            ):(
                                <div className={styles.projectInfo}>
                                    <ProjectForm
                                        handleSubmit={editPost}
                                        btnText="Finish"
                                        projectData={project}
                                    />
                                </div>
                            )}
                        </div>
                        <div className={styles.serviceFormContainer}>
                                <h2>Add a service: </h2>
                                <button onClick={toggleServiceForm} className={styles.btn}>
                                    {!showServiceForm ? 'Add service' : 'Close'}
                                </button>
                                <div className={styles.projectInfo}>
                                    {showServiceForm && (
                                        <ServiceForm
                                            handleSubmit={createService}
                                            btnText="Add service"
                                            projectData={project}
                                        />
                                    )}
                                </div>
                        </div>
                        <h2>Services</h2>
                        <Container customClass="start">
                                {services.length > 0 &&
                                    services.map((service) => (
                                        <ServiceCard
                                            id={service.id}
                                            name={service.name}
                                            cost={service.cost}
                                            description={service.description}
                                            key={service.id}
                                            handleRemove={removeService}
                                        />
                                    ))
                                }
                                {services.length === 0 &&
                                    <p>There is no service.</p>
                                }
                        </Container>
                    </Container>
                </div>
            ):(
                <Loading />
            )}
        </>
    );
}

export default Project;