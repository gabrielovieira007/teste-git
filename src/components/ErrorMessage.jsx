export default function ErrorMessage({ message }) {
  return (
    <p role="alert" className="message error">
      {message}
    </p>
  )
}
