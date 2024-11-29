import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

export const Button = React.forwardRef(
  ({ className, active, reversed, ...props }, ref) => (
    <span
      {...props}
      ref={ref}
      className={className}
      style={{
        cursor: 'pointer',
        color: reversed
          ? active
            ? 'white'
            : 'var(--color-pale)'
          : active
          ? 'black'
          : 'var(--color-x-gray)',
        margin: '0 2px',
      }}
    />
  )
);
export const EditorValue = React.forwardRef(
  ({ className, value, ...props }, ref) => {
    const textLines = value.document.nodes
      .map(node => node.text)
      .toArray()
      .join('\n');
    return (
      <div
        ref={ref}
        {...props}
        className={className}
        style={{
          margin: '30px -20px 0',
        }}
      >
        <div
          style={{
            fontSize: '14px',
            padding: '5px 20px',
            color: '#404040',
            borderTop: '2px solid #eeeeee',
            background: '#f8f8f8',
          }}
        >
          Slate's value as text
        </div>
        <div
          style={{
            color: '#404040',
            font: '12px monospace',
            whiteSpace: 'pre-wrap',
            padding: '10px 20px',
          }}
        >
          {textLines}
        </div>
      </div>
    );
  }
);
export const Icon = React.forwardRef(({ className, ...props }, ref) => (
  <span
    {...props}
    ref={ref}
    className={classNames('material-icons', className)}
    style={{
      fontSize: '18px',
      verticalAlign: 'text-bottom',
    }}
  />
));
export const Instruction = React.forwardRef(({ className, ...props }, ref) => (
  <div
    {...props}
    ref={ref}
    className={className}
    style={{
      whiteSpace: 'pre-wrap',
      margin: '0 -20px 10px',
      padding: '10px 20px',
      fontSize: '14px',
      background: '#f8f8e8',
    }}
  />
));
export const Menu = React.forwardRef(({ className, ...props }, ref) => (
  <div
    {...props}
    data-test-id="menu"
    ref={ref}
    className={className}
    style={{
      margin: '0 0 4px',
      '& > *': {
        display: 'inline-block',
      },
      '& > * + *': {
        marginLeft: '15px',
      },
    }}
  />
));
export const Portal = ({ children }) => {
  return typeof document === 'object'
    ? ReactDOM.createPortal(children, document.body)
    : null;
};
export const Toolbar = React.forwardRef(({ className, ...props }, ref) => (
  <Menu
    {...props}
    ref={ref}
    className={className}
    style={{
      position: 'relative',
      padding: '1px 18px 17px',
      margin: '0 -20px',
      borderBottom: '2px solid #eee',
      marginBottom: '20px',
    }}
  />
));
