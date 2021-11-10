import React, { useRef, useState } from "react";
import { FormControl } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import "./App.css";
import ListGroup from "./ListGroup";
import { groupBy } from "./util/groupBy";
import { queryRyhme, querySynonym } from "./util/query";

let savedWords: string[] = [];

function App() {
  const inputEl = useRef<any>(null);

  const [description, setDescription] = useState(
    "Enter a term and select an action"
  );
  
  const [saved, setSaved] = useState<string>("(put saved words here)");
  const [outputText, setOutputText] = useState<string>("");
  const [listGroups, setListGroups] = useState<any>(null);

  const saveWord = (word: string) => {
    savedWords = [...savedWords, word]
    setSaved(savedWords.toString().replaceAll(",", ", "));
  }

  async function getRyhmes(term: string) {
    setDescription(`Words that rhyme with ${term}: `);
    setOutputText("...loading");

    const words = await queryRyhme(term);
    const grouped = groupBy(words, "numSyllables");

    if (words.length) setListGroups(grouped);
    else {
      setListGroups(null);
      setOutputText("(no results)");
    }
  }
  async function getSynonym(term: string) {
    setDescription(`Words with a similar meaning to ${term}: `);
    setOutputText("...loading");

    const ryhmes = await querySynonym(term);

    if (ryhmes.length) setListGroups({ null: ryhmes });
    else {
      setListGroups(null);
      setOutputText("(no results)");
    }
  }

  return (
    <main className="container">
      <a href="https://github.com/NateMay/ps6">GitHub Repository</a>
      <h1>Rhyme Finder (579 Problem Set 5)</h1>
      <div className="row">
        <div className="col">
          Saved words: <span>{saved}</span>
        </div>
      </div>
      <InputGroup className="mb-3">
        <FormControl
          ref={inputEl}
          placeholder="Enter a word"
          aria-label="Enter a word"
          aria-describedby="basic-addon2"
        />
        <Button onClick={() => getRyhmes(inputEl!.current!.value)}>
          Show rhyming words
        </Button>
        <Button
          variant="secondary"
          onClick={() => getSynonym(inputEl!.current!.value)}
        >
          Show synonyms
        </Button>
      </InputGroup>

      <h2 className="col"> {description}</h2>
      {listGroups
        ? Object.keys(listGroups).map((num) => (
            <ListGroup
              key={num}
              num={num}
              items={listGroups[num]}
              saveWord={saveWord}
            />
          ))
        : outputText}
    </main>
  );
}

export default App;
