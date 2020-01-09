import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../configs/middlewares';
import { requisitarCriarUsuarioExterno } from './actions';

export function useAccountState(nickname: string) {
    const dispatch = useDispatch();
    const adicionandoUsuarioExterno = useSelector((state: RootState) => state.account.adicionarUsuarioExternoPending);
    const erros = useSelector((state: RootState) => state.account.erros);
    const criarUsuarioExterno = () => dispatch(requisitarCriarUsuarioExterno(nickname));

    return { adicionandoUsuarioExterno, erros, criarUsuarioExterno };
}