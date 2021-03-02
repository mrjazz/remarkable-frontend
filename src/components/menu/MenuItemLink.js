import React from 'react';
import {formatTitle} from '../../lib/WikiUtils';


export default function MenuItemLink({onClick, node}) {
    return <a onClick={onClick}>
        {node.wikilink ? formatTitle(node.wikilink) : node.title}
    </a>;
}