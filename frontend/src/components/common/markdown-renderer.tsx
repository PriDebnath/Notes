import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter, } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const LinkToChatSetting = React.memo(() => {
  return <a
    href="#"
    onClick={(e) => {
      e.preventDefault();
      const chatSettingButton = document.getElementById('chat-setting-button')
      const styles = ["ring-2", "ring-primary", "animate-pulse"]
      chatSettingButton?.classList.add(...styles)
      setTimeout(() => {
        chatSettingButton?.classList.remove(...styles)
      }, 5000);
    }}
    className="text-blue-500 underline cursor-pointer"
  >
    Go to chat settings
  </a>
})


export const MarkdownRenderer = ({ content }: { content: string }) => {
  return (
    <>
      <ReactMarkdown
        components={{
          code({ node, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");

            return match ? (
              <SyntaxHighlighter
                style={oneDark}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className="bg-muted px-1 py-0.5 rounded">
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
      {content?.includes("Invalid API Key") && <LinkToChatSetting />}
    </>
  );
};