interface IServerComponentProps {
  text: string
}

export default function ServerComponent({ text }: IServerComponentProps) {
  return <p>{text}</p>
}
