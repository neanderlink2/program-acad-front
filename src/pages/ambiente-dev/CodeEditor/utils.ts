import { LinguagensProgramacao } from "../../../models/algoritmos";

export const getAceEditorMode = (language?: LinguagensProgramacao) => {
    switch (language) {
        case 'csharp':
            return "csharp";
        case 'java':
            return "java";
        case 'nodejs':
            return "javascript";
        case 'python3':
            return "python";
        default:
            return;
    }
}