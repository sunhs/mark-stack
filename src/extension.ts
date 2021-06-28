// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { markStack, MarkItem } from "./markStack";

function setMark() {
  const editor = vscode.window.activeTextEditor;
  if (editor === undefined || !editor.selection.isEmpty) {
    return;
  }
  const document = editor.document;
  markStack.push(new MarkItem(document, editor.selection.active));
  console.log(
    markStack
      .toArray()
      .map((item: MarkItem) => {
        return item.document.fileName + ": " + item.position.line.toString();
      })
      .join("\n")
  );
}

function popMark() {
  if (markStack.size === 0) {
    return;
  }

  let item = markStack.pop();
  vscode.window.showTextDocument(item.document).then((editor) => {
    editor.selections = [new vscode.Selection(item.position, item.position)];
    editor.revealRange(new vscode.Range(item.position, item.position));
  });
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("mark-stack.setMark", () => {
      setMark();
    })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("mark-stack.popMark", () => {
      popMark();
    })
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
