import { useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import { cn } from "@/lib/utils";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
  className?: string;
  readOnly?: boolean;
}

export const CodeEditor = ({ 
  value, 
  onChange, 
  language, 
  className,
  readOnly = false 
}: CodeEditorProps) => {
  const editorRef = useRef<any>(null);

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    
    // Configure the editor theme to match our dark design
    monaco.editor.defineTheme('custom-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6B7280' },
        { token: 'keyword', foreground: '4ADE80' },
        { token: 'string', foreground: 'FCD34D' },
        { token: 'number', foreground: 'F472B6' },
        { token: 'type', foreground: '60A5FA' },
      ],
      colors: {
        'editor.background': '#0A0A0A',
        'editor.foreground': '#FFFFFF',
        'editor.lineHighlightBackground': '#1F2937',
        'editor.selectionBackground': '#374151',
        'editorCursor.foreground': '#4ADE80',
        'editorLineNumber.foreground': '#6B7280',
        'editorLineNumber.activeForeground': '#4ADE80',
        'editor.selectionHighlightBackground': '#1F2937',
        'editorBracketMatch.background': '#374151',
        'editorBracketMatch.border': '#4ADE80'
      }
    });
    
    monaco.editor.setTheme('custom-dark');
  };

  return (
    <div className={cn("border border-border rounded-lg overflow-hidden", className)}>
      <Editor
        height="100%"
        language={language}
        value={value}
        onChange={(val) => onChange(val || "")}
        onMount={handleEditorDidMount}
        options={{
          readOnly,
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "JetBrains Mono, Fira Code, monospace",
          lineNumbers: "on",
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          insertSpaces: true,
          wordWrap: "on",
          folding: true,
          showFoldingControls: "always",
          bracketPairColorization: { enabled: true },
          guides: {
            bracketPairs: true,
            indentation: true
          },
          padding: { top: 16, bottom: 16 },
          cursorBlinking: "smooth",
          cursorSmoothCaretAnimation: "on",
          smoothScrolling: true,
          contextmenu: true,
          selectOnLineNumbers: true,
          roundedSelection: false,
          renderLineHighlight: "gutter",
          scrollbar: {
            verticalScrollbarSize: 8,
            horizontalScrollbarSize: 8,
            useShadows: false
          }
        }}
      />
    </div>
  );
};