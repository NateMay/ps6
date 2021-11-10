import ListItem from "./ListItem";
import { WordResult } from "./util/word-result";

let index = 0;
function ListGroup(props: any) {
  const h2 =
    props.num !== "null" ? (
      <h2>{`${props.num} Syllable${props.num === 1 ? "" : "s"}: `}</h2>
    ) : (
      ""
    );
  return (
    <>
      {h2}
      <ul>
        {props.items.map((item: WordResult) => (
          <ListItem word={item.word} key={index++} saveWord={ props.saveWord }/>
        ))}
      </ul>
    </>
  );
}
export default ListGroup;
