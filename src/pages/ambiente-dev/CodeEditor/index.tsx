import React from 'react';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/mode-python";

import "ace-builds/src-noconflict/ext-spellcheck";
import 'ace-builds/src-noconflict/ext-searchbox';

import "ace-builds/src-noconflict/theme-tomorrow_night_eighties"
import { getAceEditorMode } from './utils';
import { LinguagensProgramacao } from '../../../models/algoritmos';

type CodeEditorType = {
    code: string,
    linguagemSelecionada?: LinguagensProgramacao,
    onCodeChange: (code: string) => void
}

export const CodeEditor = ({ code, linguagemSelecionada, onCodeChange }: CodeEditorType) => {
    return (
        <AceEditor
            mode={getAceEditorMode(linguagemSelecionada)}
            theme="tomorrow_night_eighties"
            onChange={onCodeChange}
            name="ambiente-dev"
            value={code}
            editorProps={{ $blockScrolling: Infinity }}
            style={{ flex: 1, flexGrow: 1, minWidth: 350, width: '100%', minHeight: 300 }}
            setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                showLineNumbers: true,
                useWorker: true,
                spellcheck: true,
                tabSize: 4
            }}
        />
    )
}