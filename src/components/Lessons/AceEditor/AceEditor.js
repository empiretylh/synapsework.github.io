import React from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-markdown';
import 'ace-builds/src-noconflict/theme-github_dark';
import 'ace-builds/src-noconflict/theme-clouds_midnight';

function TextEditor({ value, setValue }) {

    function onChange(newValue) {
        setValue(newValue);
    }

    return (
        <div className='flex-1  h-full mr-2'>
            <AceEditor
                mode="markdown"
                theme="clouds_midnight"
                onChange={onChange}
                name="UNIQUE_ID_OF_DIV"
                editorProps={{ $blockScrolling: true }}
                value={value}
                width="100%"
                height="100%"
                fontSize={18}
                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                }}
            />
        </div>
    );
}

export default TextEditor;