'use strict';

import * as vscode from 'vscode';
const ncp = require("copy-paste");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    let simpleGit;
    try {
        simpleGit = require('simple-git')(vscode.workspace.workspaceFolders[0].uri.fsPath);
    } catch (error) {
        console.error('Couldn\'t find git repository');
    }
    
    let disposable = vscode.commands.registerCommand('extension.copyBranchName', () => {
        if (!simpleGit) {
            console.error('Copy name of current branch extension command failed: This is not a git repository');
            return;
        }
        simpleGit.branchLocal((error, data) => {
            if (error) {
                console.error(error);
            } else {
                ncp.copy(data.current, () => console.log('Current git branch name has been copied to the system clipboard'));
            }
        });
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}