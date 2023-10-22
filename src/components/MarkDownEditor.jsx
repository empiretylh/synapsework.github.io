import React, { useState } from "react";
import Markdown from "react-markdown";

function MarkdownEditor() {
    const [markdown, setMarkdown] = useState("# This is a header");

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Markdown Editor</h1>
            <div className="flex">
                <textarea
                    className="flex-1 p-2 border rounded"
                    value={markdown}
                    onChange={(e) => setMarkdown(e.target.value)}
                    tabIndex="0 "
                    />
                <div className="flex-1 p-2 border rounded">
                    <Markdown
                        className="prose !text-gray-800 !font-normal !leading-normal"
                        linkClassName="!text-blue-500"
                        headingClassName="!text-2xl !font-bold !mb-4"
                        listClassName="!list-disc !list-inside"
                        listItemClassName="!mb-2"
                    >
                        {markdown}
                    </Markdown>
                </div>
            </div>
        </div>
    );
}

export default MarkdownEditor;