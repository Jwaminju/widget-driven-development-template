interface Props { }
import styles from '../../styles/Login.module.css';
import { auth } from "./Firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState } from "react";
import Logout from './Logout';

const Login = ({ }: Props) => {
    const [user, setUser] = useState<any | null>(null);
    const provider = new GoogleAuthProvider();
    const login = () => {
        signInWithPopup(auth, provider)
            .then((data) => {
                setUser(data.user);
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            })
    }
    return (
        <>
            <div>
                <div className={styles.circle}>
                    <div className={styles.maskb}>
                        <span className={styles.sighinbtn} onClick={login}>{user ? user.displayName : "SIGH IN"}</span>
                        {user ? <Logout></Logout> : <></>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login