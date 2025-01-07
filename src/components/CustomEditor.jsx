import React, { useRef, useState } from 'react';
import { 
  FaBold, FaItalic, FaUnderline, FaListUl, FaListOl, 
  FaAlignLeft, FaAlignCenter, FaAlignRight, FaLink, FaImage,
  FaUndo, FaRedo 
} from 'react-icons/fa';

const CustomEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      execCommand('insertHTML', '&nbsp;&nbsp;&nbsp;&nbsp;');
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    execCommand('insertText', text);
  };

  const handleLinkInsert = () => {
    if (linkUrl) {
      execCommand('createLink', linkUrl);
      setLinkUrl('');
      setShowLinkInput(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        execCommand('insertImage', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="custom-editor border border-gray-300 rounded-lg overflow-hidden">
      <div className="toolbar bg-gray-50 p-2 border-b border-gray-300 flex flex-wrap gap-2">
        <button onClick={() => execCommand('bold')} className="toolbar-btn">
          <FaBold />
        </button>
        <button onClick={() => execCommand('italic')} className="toolbar-btn">
          <FaItalic />
        </button>
        <button onClick={() => execCommand('underline')} className="toolbar-btn">
          <FaUnderline />
        </button>
        <div className="border-r border-gray-300 mx-2" />
        <button onClick={() => execCommand('insertUnorderedList')} className="toolbar-btn">
          <FaListUl />
        </button>
        <button onClick={() => execCommand('insertOrderedList')} className="toolbar-btn">
          <FaListOl />
        </button>
        <div className="border-r border-gray-300 mx-2" />
        <button onClick={() => execCommand('justifyLeft')} className="toolbar-btn">
          <FaAlignLeft />
        </button>
        <button onClick={() => execCommand('justifyCenter')} className="toolbar-btn">
          <FaAlignCenter />
        </button>
        <button onClick={() => execCommand('justifyRight')} className="toolbar-btn">
          <FaAlignRight />
        </button>
        <div className="border-r border-gray-300 mx-2" />
        <button onClick={() => setShowLinkInput(!showLinkInput)} className="toolbar-btn">
          <FaLink />
        </button>
        <label className="toolbar-btn cursor-pointer">
          <FaImage />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>
        <div className="border-r border-gray-300 mx-2" />
        <button onClick={() => execCommand('undo')} className="toolbar-btn">
          <FaUndo />
        </button>
        <button onClick={() => execCommand('redo')} className="toolbar-btn">
          <FaRedo />
        </button>
      </div>

      {showLinkInput && (
        <div className="link-input-container p-2 bg-gray-50 border-b border-gray-300 flex gap-2">
          <input
            type="url"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="Enter URL"
            className="flex-1 px-2 py-1 border border-gray-300 rounded"
          />
          <button
            onClick={handleLinkInsert}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Insert
          </button>
        </div>
      )}

      <div
        ref={editorRef}
        contentEditable
        className="editor-content p-4 min-h-[300px] focus:outline-none"
        onInput={(e) => onChange(e.currentTarget.innerHTML)}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        dangerouslySetInnerHTML={{ __html: value }}
      />

      <style>{`
        .toolbar-btn {
          padding: 0.5rem;
          border-radius: 0.375rem;
          color: #4b5563;
          transition: all 0.2s;
        }

        .toolbar-btn:hover {
          background-color: #e5e7eb;
          color: #1f2937;
        }

        .editor-content {
          font-family: Arial, sans-serif;
          line-height: 1.5;
        }

        .editor-content:focus {
          outline: none;
        }
      `}</style>
    </div>
  );
};

export default CustomEditor;
