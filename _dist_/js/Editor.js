import React, {useRef, useEffect} from "../../_snowpack/pkg/react.js";
import MonacoEditor from "../../_snowpack/pkg/@monaco-editor/react.js";
import PropTypes from "../../_snowpack/pkg/prop-types.js";
const useEventListener = (target, type, listener, ...options) => {
  useEffect(() => {
    target.addEventListener(type, listener, ...options);
    return () => {
      target.removeEventListener(type, listener, ...options);
    };
  }, [target, type, listener, options]);
};
const Editor = ({onChange, language, getEditor, value, isReadOnly}) => {
  const editorRef = useRef(null);
  function selectRange(ev) {
    if (ev.detail && editorRef.current) {
      const range = ev.detail;
      const editor = editorRef.current;
      editor.setSelection(range);
      editor.revealRangeInCenter(range, 0);
    }
  }
  useEventListener(window, "select_range", selectRange);
  const options = {
    readOnly: isReadOnly,
    selectOnLineNumbers: true,
    lineNumbers: true,
    theme: "vs-light",
    renderWhitespace: "all",
    minimap: {
      enabled: false
    }
  };
  const handleEditorChange = (value2) => {
    if (onChange) {
      onChange(value2);
    }
    return value2;
  };
  function handleEditorDidMount(kel, editor) {
    editorRef.current = editor;
    if (getEditor) {
      getEditor(editor);
    }
  }
  return /* @__PURE__ */ React.createElement(MonacoEditor, {
    height: "100%",
    language,
    editorDidMount: handleEditorDidMount,
    value,
    onChange: handleEditorChange,
    options
  });
};
Editor.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  language: PropTypes.string,
  isReadOnly: PropTypes.bool,
  getEditor: PropTypes.func
};
Editor.defaultProps = {
  value: "",
  language: "fsharp",
  isReadOnly: false
};
export default Editor;