import { Position, TextDocument } from "vscode";
import { Stack } from "stack-typescript";

class MarkItem {
  document: TextDocument;
  position: Position;

  constructor(document: TextDocument, position: Position) {
    this.document = document;
    this.position = position;
  }
}

let markStack = new Stack<MarkItem>();

export { MarkItem, markStack };
