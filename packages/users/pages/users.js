import styles from './users.css';
import Link from 'umi/link';

export default function() {
  return (
    <div className={styles.normal}>
      <h1>Page users</h1>
      <li><Link to="/">go to /</Link></li>
    </div>
  );
}
