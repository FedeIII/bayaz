import { useCallback, useEffect, useMemo, useState } from 'react';
import isHotkey from 'is-hotkey';
import { Editable, withReact, useSlate, Slate } from 'slate-react';
import {
  Editor,
  Transforms,
  createEditor,
  Element as SlateElement,
} from 'slate';
import { Button, Icon, Toolbar } from './htmlInputComponents';

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
};
const LIST_TYPES = ['numbered-list', 'bulleted-list'];
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify'];

const DEFAULT_NOTES = [{ type: 'paragraph', children: [{ text: '' }] }];
const textToSlate = text => {
  if (!text) return DEFAULT_NOTES;
  if (text[0] === '[') {
    return JSON.parse(text);
  }
  return text.split('\n').map(line => ({
    type: 'paragraph',
    children: [{ text: line }],
  }));
};

function HtmlInput(props) {
  const { name, value, onChange } = props;
  const renderElement = useCallback(props => <Element {...props} />, []);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);
  const editor = useMemo(() => withReact(createEditor()), []);

  const [isExternalChange, setIsExternalChange] = useState(true);

  useEffect(() => {
    if (typeof value === 'string' && isExternalChange) {
      // Avoid "Cannot resolve a DOM node from Slate node" error
      setTimeout(() => {
        Transforms.delete(editor, {
          at: {
            anchor: Editor.start(editor, []),
            focus: Editor.end(editor, []),
          },
        });
        Transforms.removeNodes(editor, {
          at: [0],
        });
        Transforms.insertNodes(editor, textToSlate(value));
        setIsExternalChange(false);
      }, 0);
    }
  }, [value, isExternalChange]);

  return (
    <>
      <Slate
        editor={editor}
        initialValue={DEFAULT_NOTES}
        onChange={value => {
          const isAstChange = editor.operations.some(
            op => 'set_selection' !== op.type
          );
          if (isAstChange && !isExternalChange) {
            onChange(JSON.stringify(value));
          }
        }}
      >
        <Toolbar>
          <MarkButton format="bold" icon="format_bold" />
          <MarkButton format="italic" icon="format_italic" />
          <MarkButton format="underline" icon="format_underlined" />
          <MarkButton format="code" icon="code" />
          <BlockButton format="heading-one" icon="looks_one" />
          <BlockButton format="heading-two" icon="looks_two" />
          <BlockButton format="block-quote" icon="format_quote" />
          <BlockButton format="numbered-list" icon="format_list_numbered" />
          <BlockButton format="bulleted-list" icon="format_list_bulleted" />
          <BlockButton format="left" icon="format_align_left" />
          <BlockButton format="center" icon="format_align_center" />
          <BlockButton format="right" icon="format_align_right" />
          <BlockButton format="justify" icon="format_align_justify" />
        </Toolbar>
        <Editable
          style={{
            width: '80%',
            minHeight: '100px',
            border: 'none',
            borderTop: '1px solid var(--color-x-pale)',
            background: 'none',
            color: 'white',
            fontFamily: 'var(--font-family)',
            fontSize: 'var(--font-size-m)',
            padding: '16px 0 0 16px',
            scrollbarColor: 'white',
            textAlign: 'left',
          }}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Enter some rich text…"
          spellCheck
          onKeyDown={event => {
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event)) {
                event.preventDefault();
                const mark = HOTKEYS[hotkey];
                toggleMark(editor, mark);
              }
            }
          }}
        />
      </Slate>
      <input
        readOnly
        type="text"
        name={name}
        value={value ? value : ''}
        hidden
      />
    </>
  );
}

function toggleBlock(editor, format) {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
  );
  const isList = LIST_TYPES.includes(format);
  Transforms.unwrapNodes(editor, {
    match: n =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  });
  let newProperties;
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    };
  } else {
    newProperties = {
      type: isActive ? 'paragraph' : isList ? 'list-item' : format,
    };
  }
  Transforms.setNodes(editor, newProperties);
  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
}

function toggleMark(editor, format) {
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
}

function isBlockActive(editor, format, blockType = 'type') {
  const { selection } = editor;
  if (!selection) return false;
  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: n =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n[blockType] === format,
    })
  );
  return !!match;
}

function isMarkActive(editor, format) {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
}

function Element({ attributes, children, element }) {
  const style = { textAlign: element.align };
  const styleNoMargin = { textAlign: element.align, margin: 0 };
  switch (element.type) {
    case 'block-quote':
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      );
    case 'bulleted-list':
      return (
        <ul style={styleNoMargin} {...attributes}>
          {children}
        </ul>
      );
    case 'heading-one':
      return (
        <h1 style={styleNoMargin} {...attributes}>
          {children}
        </h1>
      );
    case 'heading-two':
      return (
        <h2 style={styleNoMargin} {...attributes}>
          {children}
        </h2>
      );
    case 'list-item':
      return (
        <li style={styleNoMargin} {...attributes}>
          {children}
        </li>
      );
    case 'numbered-list':
      return (
        <ol style={styleNoMargin} {...attributes}>
          {children}
        </ol>
      );
    default:
      return (
        <p style={styleNoMargin} {...attributes}>
          {children}
        </p>
      );
  }
}

function Leaf({ attributes, children, leaf }) {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }
  if (leaf.code) {
    children = <code>{children}</code>;
  }
  if (leaf.italic) {
    children = <em>{children}</em>;
  }
  if (leaf.underline) {
    children = <u>{children}</u>;
  }
  return <span {...attributes}>{children}</span>;
}

function BlockButton({ format, icon, children }) {
  const editor = useSlate();
  return (
    <Button
      active={isBlockActive(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
      )}
      reversed
      onMouseDown={event => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
      {children}
    </Button>
  );
}

function MarkButton({ format, icon, children }) {
  const editor = useSlate();
  return (
    <Button
      active={isMarkActive(editor, format)}
      reversed
      onMouseDown={event => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
      {children}
    </Button>
  );
}

export default HtmlInput;
