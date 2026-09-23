export function ImageInput({ question }) {
  return <input id={question.id} name={question.name} type="image" src={question.src} alt={question.label} />
}
