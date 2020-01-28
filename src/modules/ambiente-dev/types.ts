import { LinguagensProgramacao } from "../../models/algoritmos";

export const COMPILE_CODE_REQUEST = '@ambienteDev/COMPILE_CODE_REQUEST';
export const COMPILE_CODE_SUCCEEDED = '@ambienteDev/COMPILE_CODE_SUCCEEDED';
export const COMPILE_CODE_FAILED = '@ambienteDev/COMPILE_CODE_FAILED';

export type CompilePayload = {
    code: string,
    language: LinguagensProgramacao,
    inputs: string[]
}

export type CompileResult = {
    output?: string,
    statusCode?: number,
    cpuTime?: number,
    hasCompilingError?: boolean
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

export type AmbienteDevState = {
    isCompiling: boolean,
    compileResult?: CompileResult,
    erros: string[]
}

export type AmbienteDevActionTypes = CompileCodeRequestAction | CompileCodeSucceededAction | CompileCodeFailedAction;