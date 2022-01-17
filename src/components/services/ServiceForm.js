import styles from '../project/ProjectForm.module.css';
import { useState } from 'react';
import Input from '../form/Input';
import SubmitButton from '../form/SubmitButton';

function ServiceForm({ handleSubmit, btnText, projectData }) {

    const [ service, setService ] = useState({});

    function submit(event) {
        event.preventDefault();
        projectData.services.push(service);
        handleSubmit(projectData);
    }

    function handleChange(event) {
        setService({...service, [event.target.name]: event.target.value})
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input
                type="text"
                text="Name of service"
                name="name"
                placeholder="Insert name of service"
                handleOnChange={handleChange}
            />
            <Input
                type="number"
                text="Service cost"
                name="cost"
                placeholder="Insert total amount"
                handleOnChange={handleChange}
            />
            <Input
                type="text"
                text="Service description"
                name="description"
                placeholder="Descript the service"
                handleOnChange={handleChange}
            />
            <SubmitButton text={btnText} />
        </form>
    );
}

export default ServiceForm;