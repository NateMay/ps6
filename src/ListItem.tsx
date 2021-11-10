


function ListItem(props: any) {
  return (
    <li>{props.word}
      <button className="btn btn-outline-success" onClick={() => props.saveWord(props.word) }>(save)</button>
    </li>
  )
}
export default ListItem
