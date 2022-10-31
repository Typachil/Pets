import { Auth, GoogleAuthProvider, signInWithPopup, UserCredential } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../store/reducers/reducerUser';
import { HOME_ROUTE } from '../utils/constRoutes';
import { useAppDispatch } from './redux';

const dispatchUserResult = (result : UserCredential) => {

}

const useSignWithSocial = (auth : Auth) =>  {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
        .then((result) => {
            
            // const credential = GoogleAuthProvider.credentialFromResult(result);
            console.log(result);
            
            const token = result.user.refreshToken;
            const user = result.user;
            
            // dispatch(
            //     setUser({
            //         email: user.email,
            //         id: user.uid,
            //         token: token,
            //         name: user.displayName,
            //     })
            // );
            // navigate(HOME_ROUTE.path);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
        });
};

export default useSignWithSocial;