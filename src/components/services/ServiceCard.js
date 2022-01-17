import styles from '../project/ProjectCard.module.css';
import { BsFillTrashFill } from 'react-icons/bs';

function ServiceCard({ id, name, cost, description, handleRemove }) {
    
    const remove = (event) => {
        event.preventDefault();
        handleRemove(id, cost);
    }

    return(
        <div className={styles.projectCard}>
            <h4>{name}</h4>
            <p>
                <span>Total cost: </span> ${cost}
            </p>
            <p>{description}</p>
            <div className={styles.projectCardActions}>
                <button onClick={remove}>
                    <BsFillTrashFill />
                    Delete
                </button>
            </div>
        </div>
    );
}

export default ServiceCard;