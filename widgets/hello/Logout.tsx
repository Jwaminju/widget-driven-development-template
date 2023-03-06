interface Props { }
import { signOut } from 'firebase/auth';
import styles from '../../styles/Login.module.css';
import { auth } from "./Firebase";
import { useState } from "react";

const Logout = ({ }: Props) => {
    const [isLogin, setIsLogin] = useState<any | null>(null);
    const logout = () => {
        signOut(auth)
            .then(() => {
                setIsLogin(true);
                console.log("logout success");
            })
            .catch((err) => {
                setIsLogin(false);
                console.log("logout fail");
            })
    }
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