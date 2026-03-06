type TextBlocksProps = {
  text: string
}

export const TextBlocks = ({ text }: TextBlocksProps) => (
  <>
    {text.split('\n\n').map((paragraph) => (
      <p key={paragraph} className="copy-block">
        {paragraph}
      </p>
    ))}
  </>
)
