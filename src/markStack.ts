import * as vscode from 'vscode';
import { Stack } from 'stack-typescript';


class MarkItem {
    editor: vscode.TextEditor;
    position: vscode.Position;

    constructor(editor: vscode.TextEditor, position: vscode.Position) {
        this.editor = editor;
        this.position = position;
    }
}


let markStack = new Stack<MarkItem>();

export { MarkItem, markStack };