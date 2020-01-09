import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../configs/middlewares';
import { requisitarCriarUsuarioExterno, requisitarCriarUsuarioInterno, limparErros } from './actions';
import { CreateInternalUser } from './types';

export function useAccountState(nickname?: string, usuario?: CreateInternalUser) {
    const dispatch = useDispatch();
    const adicionandoUsuarioExterno = useSelector((state: RootState) => state.account.adicionarUsuarioExternoPending);
    const adicionandoUsuarioInterno = useSelector((state: RootState) => state.account.adicionarUsuarioInternoPending);

    const erros = useSelector((state: RootState) => state.account.erros);
    const cleanErrors = () => dispatch(limparErros());

    if (nickname) {
        const criarUsuarioExterno = () => dispatch(requisitarCriarUsuarioExterno(nickname));

        return { adicionandoUsuarioExterno, erros, cleanErrors, criarUsuarioExterno };
    } else if (usuario) {
        const criarUsuarioInterno = () => dispatch(requisitarCriarUsuarioInterno(usuario));
        return { adicionandoUsuarioInterno, erros, cleanErrors, criarUsuarioInterno };
    }

    return { adicionandoUsuarioExterno, adicionandoUsuarioInterno, erros, cleanErrors };
}