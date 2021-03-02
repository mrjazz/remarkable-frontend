import React from 'react';
// import ReactMarkdown from 'react-markdown';
import {formatTitle} from '../../lib/WikiUtils';
import './SearchResult.css';


export default function SearchResult({result, redirect}) {    
    // <ReactMarkdown 
    //         allowedTypes={['link', 'text', 'paragraph', 'list', 'listItem']}
    //         key={key}>
    //             {o.line.trim()}
    //         </ReactMarkdown>
    return <div className="searchResult" onClick={() => redirect(result.path)}>
        <div className="title">{formatTitle(result.name)}</div>
        {result.occurences.map((o, key) => <p key={key} dangerouslySetInnerHTML={{ __html: o.line.trim() }}/>)}
    </div>;
}