import React, { useState } from 'react';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";

export const AmbienteDevScreen = () => {
    const [code, setCode] = useState('');
    return (
        <div style={{ display: 'flex', flex: 1, background: 'red' }}>
            <div style={{ display: 'flex', flex: 1, backgroundColor: '#121212' }}>
                <span>AAAAAAAAAAA</span>
            </div>
            <AceEditor
                mode="javascript"
                theme="monokai"
                height="500px"
                width="70%"
                enableBasicAutocompletion={true}
                enableLiveAutocompletion={true}
                onChange={(value) => setCode(value)}
                name="ambiente-dev"
                value={code}
                editorProps={{ $blockScrolling: true }}
            />
        </div>
    );
}