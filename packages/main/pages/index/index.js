import { connect } from 'dva';
import Link from 'umi/link';
import styles from './index.css';

export default connect(
  state => ({ index: state.index })
)(function(props) {
  return (
    <div className={styles.normal}>
      <h1>{ props.index.title }</h1>
      <ul>
        <li><Link to="/users">go to /users</Link></li>
      </ul>
    </div>
  );
});
