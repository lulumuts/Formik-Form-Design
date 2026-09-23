export function ButtonInput({ question }) {
  return <input id={question.id} name={question.name} type="button" value={question.label} />
}
