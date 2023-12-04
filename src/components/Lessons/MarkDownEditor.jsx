import React, { useState } from "react";
import Markdown from "markdown-to-jsx";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import TextEditor from "./AceEditor/AceEditor";
const Code = ({ children = "", ...props }) => {
  const isMultiLine = children.split("\n").length > 1;

  const isCodeBlock = children.startsWith("\n") || isMultiLine;

  if (children.startsWith("\n")) {
    children = children.slice(1);
  }

  //filter \n is more than one
  if (isCodeBlock) {
    return (
      <SyntaxHighlighter language={props.language} style={vscDarkPlus}>
        {children}
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

function MarkdownEditor({ markdown, setMarkdown, style }) {
  const languages = getLanguagesFromMarkdown(markdown);
  console.log("Languages: ", languages);



  return (
    <div className="h-full" style={{
      backgroundColor:'#f0f0f0'
    }}>
      <div className="flex h-full" style={{
        boxSizing: "border-box",
      }}>
        {/* <textarea
          className="flex-1 p-2 mr-2 bg-gray-900 text-white h-full"
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          tabIndex="0"
        /> */}
        <TextEditor value={markdown} setValue={setMarkdown} />


        <div className="flex-1 h-full" style={{ maxWidth: 500, overflow: 'auto' }}>
          <Markdown
            options={{
              overrides: {
                h1: {
                  component: "h1",
                  props: { className: "text-2xl font-bold mb-2" },
                },
                h2: {
                  component: "h2",
                  props: { className: "text-xl font-bold mb-2" },
                },
                h3: {
                  component: "h3",
                  props: { className: "text-lg font-bold mb-2" },
                },
                h4: {
                  component: "h4",
                  props: { className: "text-base font-bold mb-2" },
                },
                h5: {
                  component: "h5",
                  props: { className: "text-sm font-bold mb-2" },
                },
                h6: {
                  component: "h6",
                  props: { className: "text-xs font-bold mb-2" },
                },
                p: {
                  component: "p",
                  props: { className: "mb-2" },
                },
                a: {
                  component: "a",
                  props: { className: "text-blue-500 underline" },
                },

                strong: {
                  component: "span",
                  props: { className: "font-bold" },
                },

                code: { component: Code, props: { language: languages[0] } },
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
