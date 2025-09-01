
type Props = {
  tag: string
}
export const Tags = ({ tag, ...rest }: Props) => {
  return (
    <span
      className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full"
      {...rest}
    >
      {tag}
    </span>
  )
}