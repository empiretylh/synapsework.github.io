import React, { useState } from "react";
import Markdown from "markdown-to-jsx";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
const Code = ({ children, ...props }) => {
    if (children.includes('\n')) {
     
        return (
            <SyntaxHighlighter language={props.language} style={vscDarkPlus}>
                {children && children.replace('\n','')}
            </SyntaxHighlighter>
        );
    } else {
      
        return <code className="text-red-700">{children}</code>;
    }
};
function getLanguagesFromMarkdown(markdown) {
  const languageRegex = /^```(\w+)/gm;
  const languages = [];
  let match;
  while ((match = languageRegex.exec(markdown)) !== null) {
    languages.push(match[1]);
  }
  return languages;
}

function MarkdownEditor({ markdown, setMarkdown }) {
  const languages = getLanguagesFromMarkdown(markdown);
  console.log("Languages: ", languages);


  return (
    <div className="h-full">
      <div className="flex h-full">
        <textarea
          className="flex-1 p-2 mr-2 bg-gray-900 text-white h-full"
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          tabIndex="0"
         
        />
        <div className="flex-1 p-2 border rounded overflow-auto bg-white">
          <Markdown
            options={{
              overrides: {
                h1: {
                  component: "h1",
                  props: { className: "text-2xl font-bold mb-2" },
                },
                strong: {
                  component: "span",
                  props: { className: "font-bold" },
                },
                code: { component: Code, props: {language:languages[0]} },
               
              },
            }}
          >
            {markdown}
          </Markdown>
        </div>
      </div>
    </div>
  );
}

export default MarkdownEditor;
