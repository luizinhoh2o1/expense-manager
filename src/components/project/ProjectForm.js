import styles from './ProjectForm.module.css';
import Input from '../form/Input';
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';
import {useEffect, useState} from 'react';

function ProjectForm({handleSubmit, btnText, projectData}) {

    const [categories, setCategories] = useState([]);
    const [project, setProject] = useState(projectData || []);

    const submit = (event) => {
        event.preventDefault();
        handleSubmit(project);
    }

    function handleChange(event) {
        setProject({...project, [event.target.name]: event.target.value});
    }

    function handleCategory(event) {
        setProject({
            ...project,
            category: {
                id: event.target.value,
                name: event.target.options[event.target.selectedIndex].text
            }
        });
    }
 
    useEffect(() => {
        fetch("http://localhost:5000/categories", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((data) => {
            setCategories(data);
        })
        .catch(error => console.log(error));
    }, []);

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input
                type="text"
                text="Project Name"
                name="name"
                placeholder="Insert project name"
                handleOnChange={handleChange}
                value={project.name ? project.name : ''}
            />
            <Input
                type="number"
                text="Insert the total budget"
                name="budget"
                placeholder="Insert the total budget"
                handleOnChange={handleChange}
                value={project.budget ? project.budget : ''}
            />
            <Select
                name="categoryID"
                text="Select an category"
                options={categories}
                handleOnChange={handleCategory}
                value={project.category ? project.category.id : ''}
            />
            <SubmitButton text={btnText}/>
        </form>
    );
}

export default ProjectForm;