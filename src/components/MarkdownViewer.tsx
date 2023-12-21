import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import { materialDark} from 'react-syntax-highlighter/dist/esm/styles/prism'
import Image from 'next/image';


export default function MarkdownViewer({content} : {content : string}) {
    
    return (
        <ReactMarkdown
        className='prose max-x-none'
        remarkPlugins={[remarkGfm]}
        components={{
            code(props) {
                const {children, className, node, ...rest} = props
                const match = /language-(\w+)/.exec(className || '')
                return match ? (
                    <SyntaxHighlighter
                    PreTag="div"
                    language={match[1]}
                    {...rest}
                    style={materialDark}
                    > 
                    {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                ) : (
                    <code {...rest} className={className}>
                    {children}
                    </code>
                );
                }
            }}
        >
            {content}
        </ReactMarkdown>

    )
}
