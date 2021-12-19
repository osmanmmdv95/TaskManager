import React from 'react'
import { Input } from 'antd'
const { TextArea } = Input

export default function AntInput(
    { header,
        value,
        id,
        placeholder,
        onChange,
        onKeyUp,
        onKeypress,
        onKeydown,
        sizes,
        message,
        icon,
        readOnly,
        type,
        textArea,
        rows,
        maxLen,
        showCount
    }) {
    return (
        <div className='input-group'>
            {header ?
                <span className='title'>{header}</span>
                :
                null
            }
            {!textArea ?
                <Input
                    className={`${message ? 'error' : ''}`}
                    id={id}
                    value={value}
                    type={type}
                    placeholder={placeholder}
                    size={sizes}
                    onChange={onChange}
                    onKeyUp={onKeyUp}
                    onKeyPress={onKeypress}
                    onKeyDown={onKeydown}
                    readOnly={readOnly}
                    maxLength={maxLen}
                    prefix={icon}
                />
                :
                <TextArea
                    maxLength={maxLen}
                    showCount={showCount}
                    rows={rows}
                    className={`${message ? 'error' : ''}`}
                    id={id}
                    value={value}
                    type={type}
                    placeholder={placeholder}
                    size={sizes}
                    onChange={onChange}
                    onKeyUp={onKeyUp}
                    onKeyPress={onKeypress}
                    onKeyDown={onKeydown}
                    readOnly={readOnly}
                />
            }
            {message ?
                <span className='messages'>{message}</span>
                :
                null
            }
        </div>
    )
}