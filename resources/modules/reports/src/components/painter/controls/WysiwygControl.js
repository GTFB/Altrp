import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import "tinymce/tinymce.min.js";
import "tinymce/icons/default";
import "tinymce/themes/silver";
import "tinymce/plugins/fullpage";
import "tinymce/plugins/insertdatetime";
import "tinymce/plugins/table";
import "tinymce/plugins/visualblocks";
import "tinymce/plugins/autolink";

import "tinymce/skins/ui/oxide/skin.min.css";

const WysiwygControl = ({ value, onChange, disabled = false }) => {
  return (
    <Editor
      value={value}
      onEditorChange={onChange}
      disabled={disabled}
      init={{
        height: 400,
        menubar: true,
        plugins: ["autolink", "visualblocks fullpage", "insertdatetime table"],
        toolbar: `undo redo | formatselect | bold italic backcolor | 
    alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | 
    removeformat`,
      }}
    />
  );
};

export default WysiwygControl;
