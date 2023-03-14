import { signOut } from 'firebase/auth';
import styles from '../../styles/Login.module.css';
import { auth } from "./Firebase";
import { useState } from "react";
import { ChakraProvider } from "@chakra-ui/provider";

const Logout = () => {
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
        <ChakraProvider>
            <div className={styles.circle}>
                <div className={styles.maskb}>
                    <span className={styles.signoutbtn} onClick={logout}>{isLogin ? "signout success" : "SIGN OUT"}</span>

                </div>
            </div>
        </ChakraProvider>
    )
}

export default Logout