import Error from "./Error";
import Loading from "./Loading";
import Presenter from "./Presenter";
import {useFirebaseSignIn, useFirebaseSignOut} from "../../hooks/useFirebase";

const AuthContainer = () => {
    const {signInWithGoogle, user, error} = useFirebaseSignIn();
    const {signOut, loading} = useFirebaseSignOut();

    if (user) {
        return <Presenter user={user} signIn={signInWithGoogle} signOut={signOut} />
    }

    if (error) {
        return <Error />
    }

    return <Loading />
}

export default AuthContainer
