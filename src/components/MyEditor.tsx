import { useState, useEffect } from "react";
import { Editor, EditorState, RichUtils, ContentState } from "draft-js"; // Import necessary modules from draft-js
import "draft-js/dist/Draft.css";
import dynamic from "next/dynamic";

const FroalaEditor = dynamic(() => import("react-froala-wysiwyg"), {
  ssr: false,
});

interface MyEditorProps {
  initialContent?: string;
  onContentChange: (content: string) => void;
}

const MyEditor = ({ initialContent, onContentChange }: MyEditorProps) => {
  const [editorState, setEditorState] = useState<EditorState>(() =>
    initialContent
      ? EditorState.createWithContent(
          ContentState.createFromText(initialContent)
        )
      : EditorState.createEmpty()
  );

  useEffect(() => {
    if (initialContent) {
      const newEditorState = EditorState.createWithContent(
        ContentState.createFromText(initialContent)
      );
      setEditorState(newEditorState);
    }
  }, [initialContent]);

  useEffect(() => {
    // Configuração do Froala Editor
    new FroalaEditor("#editor", {
      pluginsEnabled: ["emoji"],
      toolbarButtons: ["emoji"],
      emojisSet: "emojione",
      emojiDefaultSet: "emojione",
      emojiInsertOnSpace: true,
      events: {
        contentChanged: () => {
          // Manipular mudanças no editor aqui, se necessário
          const content = (document.getElementById("editor") as HTMLElement)
            .innerHTML;
          setEditorState(
            EditorState.createWithContent(ContentState.createFromText(content))
          );
        },
      },
    });
  }, []);

  const handleEditorChange = (editorState: EditorState) => {
    setEditorState(editorState);
    const contentState = editorState.getCurrentContent();
    const newContent = contentState.getPlainText();
    onContentChange(newContent);
  };

  const handleFormat = (style: string) => {
    handleEditorChange(RichUtils.toggleInlineStyle(editorState, style));
  };

  return (
    <div>
      <div>
        <button onClick={() => handleFormat("BOLD")}>Negrito</button>
        <button onClick={() => handleFormat("ITALIC")}>Itálico</button>
      </div>
      <div id="editor">
        <Editor editorState={editorState} onChange={handleEditorChange} />
      </div>
    </div>
  );
};

export default MyEditor;
