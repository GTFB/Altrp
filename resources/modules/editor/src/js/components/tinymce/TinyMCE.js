import React from "react";
import { Editor } from "@tinymce/tinymce-react";

import "tinymce/tinymce.min.js";
import "tinymce/icons/default";
import "tinymce/themes/silver";
import "tinymce/plugins/insertdatetime";
import "tinymce/plugins/table";
import "tinymce/plugins/code";
import "tinymce/plugins/autolink";

const TinyMCE = ({ value, onChange, disabled = false }) => {
  return (
    <Editor
      value={value}
      onEditorChange={onChange}
      disabled={disabled}
      init={{
        removed_menuitems: "newdocument",
        table_toolbar: "",
        menubar: true,
        height: 400,
        skin: "oxide",
        skin_url: "../css/skins/ui/oxide",
        plugins: ["autolink insertdatetime table code"],
        toolbar: `formatselect | bold italic | 
    alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |
    removeformat code | undo redo`,
      }}
    />
  );
};

export default TinyMCE;
