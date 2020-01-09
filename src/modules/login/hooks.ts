import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../configs/middlewares';
import { storeUser, removeUser as removeUserToken } from './actions';
import { UserToken } from '../../models/user'

export const useLoginState = () => {
    const dispatch = useDispatch();
    const usuario = useSelector((state: RootState) => state.login?.user);
    const isLogado = useSelector((state: RootState) => state.login?.isLogado);
    const saveUser = (user: UserToken) => dispatch(storeUser(user));
    const removeUser = () => dispatch(removeUserToken());

    return { usuario, isLogado, saveUser, removeUser };
}