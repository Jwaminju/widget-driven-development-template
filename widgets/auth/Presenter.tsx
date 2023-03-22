import styles from "../../styles/Login.module.css";
import {UserCredential} from "firebase/auth";
import CommonButton from "../../components/CommonButton";

interface Props {
  user: UserCredential;
  signIn:  (args: any) => any;
  signOut: (args: any) => any;
}

const Presenter = ({ user, signIn, signOut }: Props) => {
    return (
          <div className={styles.circle}>
              <div className={styles.maskb}>
                {
                  user ?
                  <CommonButton label={"SignOut"} onClick={signOut}/>
                  :
                  <CommonButton label={"SignIn"} onClick={signIn}/>
                }
              </div>
          </div>
    )
}

export default Presenter
