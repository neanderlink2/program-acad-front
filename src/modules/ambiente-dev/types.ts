import { LinguagensProgramacao } from "../../models/algoritmos";

export const COMPILE_CODE_REQUEST = '@ambienteDev/COMPILE_CODE_REQUEST';
export const COMPILE_CODE_SUCCEEDED = '@ambienteDev/COMPILE_CODE_SUCCEEDED';
export const COMPILE_CODE_FAILED = '@ambienteDev/COMPILE_CODE_FAILED';

export const TESTAR_CODIGO_REQUEST = '@ambienteDev/TESTAR_CODIGO_REQUEST';
export const TESTAR_CODIGO_SUCCEEDED = '@ambienteDev/TESTAR_CODIGO_SUCCEEDED';
export const TESTAR_CODIGO_FAILED = '@ambienteDev/TESTAR_CODIGO_FAILED';

export const LIMPAR_RESULTADO_TESTES = '@ambienteDev/LIMPAR_RESULTADO_TESTES';

export type CompilePayload = {
    code: string,
    language: LinguagensProgramacao,
    inputs: string[]
}

export type TestarCodigoPayload = {
    idAlgoritmo: string,
    code: string,
    language: LinguagensProgramacao,
}

export type CompileResult = {
    output?: string,
    statusCode?: number,
    cpuTime?: number,
    hasCompilingError?: boolean
}

export type TestarCodigoResult = {
    idCasoTeste: string,
    idAlgoritmo: string,
    idUsuario: string,
    sucesso: boolean,
    tempoExecucao: number,
    linguagemUtilizada: LinguagensProgramacao
}

export interface CompileCodeRequestAction {
    type: typeof COMPILE_CODE_REQUEST,
    payload: CompilePayload
}

interface CompileCodeSucceededAction {
    type: typeof COMPILE_CODE_SUCCEEDED,
    payload: CompileResult
}

interface CompileCodeFailedAction {
    type: typeof COMPILE_CODE_FAILED,
    payload: string[]
}

export interface TestarCodigoRequestAction {
    type: typeof TESTAR_CODIGO_REQUEST,
    payload: TestarCodigoPayload
}

interface TestarCodigoSucceededAction {
    type: typeof TESTAR_CODIGO_SUCCEEDED,
    payload: TestarCodigoResult[]
}

interface TestarCodigoFailedAction {
    type: typeof TESTAR_CODIGO_FAILED,
    payload: string[]
}

interface LimparResultadoTesteAction {
    type: typeof LIMPAR_RESULTADO_TESTES
}

export type AmbienteDevState = {
    isCompiling: boolean,
    isTesting: boolean,
    compileResult?: CompileResult,
    testesResult?: TestarCodigoResult[],
    erros: string[]
}

export type AmbienteDevActionTypes = CompileCodeRequestAction | CompileCodeSucceededAction | CompileCodeFailedAction | TestarCodigoRequestAction |
    TestarCodigoFailedAction | TestarCodigoSucceededAction | LimparResultadoTesteAction;