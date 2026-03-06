import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx'
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import type { Category } from '../types'

SyntaxHighlighter.registerLanguage('javascript', javascript)
SyntaxHighlighter.registerLanguage('jsx', jsx)
SyntaxHighlighter.registerLanguage('tsx', tsx)
SyntaxHighlighter.registerLanguage('typescript', typescript)

const codeLanguageByCategory: Record<Category, string> = {
  javascript: 'javascript',
  typescript: 'typescript',
  react: 'tsx',
}

const codeTheme = {
  ...oneDark,
  'pre[class*="language-"]': {
    ...oneDark['pre[class*="language-"]'],
    margin: 0,
    padding: '1rem',
    borderRadius: '1rem',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    background: 'rgba(0, 0, 0, 0.34)',
  },
  'code[class*="language-"]': {
    ...oneDark['code[class*="language-"]'],
    fontFamily: "'SFMono-Regular', 'SF Mono', Consolas, 'Liberation Mono', monospace",
    fontSize: '0.95rem',
  },
} as const

type SyntaxCodeBlockProps = {
  category: Category
  code: string
}

export const SyntaxCodeBlock = ({ category, code }: SyntaxCodeBlockProps) => (
  <SyntaxHighlighter className="example-code" language={codeLanguageByCategory[category]} style={codeTheme} wrapLongLines>
    {code}
  </SyntaxHighlighter>
)
