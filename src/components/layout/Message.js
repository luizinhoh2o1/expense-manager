import styles from './Message.module.css';
import {useState, useEffect} from 'react';

function Message({text, type}) {

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if(!text) {
            setVisible(false);
            return;
        }

        setVisible(true);

        const timer = setTimeout(() => {
            setVisible(false);
        }, 3000);

        return () => clearTimeout(timer);

    },[text]);

    return (
        <>
            {visible && (
                <div className={`${styles.message} ${styles[type]}`}>
                    {text}
                </div>
            )}
        </>
    );
}

export default Message;