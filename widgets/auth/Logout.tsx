import {useLogout} from "../../hooks/useLogout";
import styles from '../../styles/Login.module.css';

interface Props { }

const Logout = ({ }: Props) => {
    const {isLogin, logout} = useLogout();
    return (
        <>
            <div className={styles.circle}>
                <div className={styles.maskb}>
                    <span className={styles.signoutbtn} onClick={logout}>{isLogin ? "logout success" : "still SIGH IN"}</span>

                </div>
            </div>
        </>
    )
}

export default Logout