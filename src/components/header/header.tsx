import styles from './header.module.css';
import { Link } from 'react-router-dom';


export function Header() {
    return(
        <header className={styles.container}>
            <Link to='/'>
                <span className={styles.brand}>JLMS</span> <span className={styles.appName}>Currency</span>
            </Link>
        </header>
    )
}