import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

import "tinymce/tinymce.min.js";
import "tinymce/icons/default";
import "tinymce/themes/silver";
import "tinymce/plugins/insertdatetime";
import "tinymce/plugins/table";
import "tinymce/plugins/autolink";
import "tinymce/plugins/code";

import "tinymce/skins/ui/oxide/skin.min.css";
import "tinymce/skins/ui/oxide/content.inline.min.css";

const WysiwygInlineControl = ({ value, onChange }) => {
  const [text, setText] = useState(value);
  const [editable, setEditable] = useState(false);

  return (
    <div
      draggable
      onDoubleClick={() => setEditable(true)}
      onDragStart={(e) => {
        if (editable) {
          e.stopPropagation();
          e.preventDefault();
        }
      }}
    >
      <Editor
        value={text}
        onEditorChange={(content) => setText(content)}
        onBlur={() => onChange(text)}
        inline={true}
        disabled={!editable}
        init={{
          menubar: false,
          contextmenu: false,
          plugins: ["autolink insertdatetime table code"],
          toolbar: `styleselect table insertdatetime | bold italic underline | align | forecolor | bullist numlist | outdent indent |
           undo redo | removeformat code`,
          table_toolbar: "",
        }}
      />
    </div>
  );
};

export default WysiwygInlineControl;
