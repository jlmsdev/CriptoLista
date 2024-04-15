import styles from './notfound.module.css';
import { Link } from 'react-router-dom';

export function NotFound() {
    return(
        <div className={styles.container}>
            <h1>404</h1>
            <h2>Pagina não encontrada.</h2>

            <Link to='/'>
                Voltar Para Home
            </Link>

        </div>
    )
}