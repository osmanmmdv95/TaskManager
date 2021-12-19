import React from 'react'
import { Button } from 'antd'

export default function AntButton({ content, icons, types, disabled, sizes, onClick, block, className }) {
    return (
        <Button
            className={className}
            block={block}
            type={`${types ? types : 'defult'}`}
            disabled={disabled}
            size={`${sizes ? sizes : 'default'}`}
            icon={icons}
            onClick={onClick}>
            {/* <span className='anticon anticon-plus'>
                {icons ? icons : null}
            </span> */}
            {content ? content : ''}
        </Button>
    )
}
