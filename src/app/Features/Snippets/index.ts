import type { Snippet } from '../../types'
import { BaseFeature } from '@features/BaseFeature'

export class MonacoSnippet extends BaseFeature {
  public static shouldRunOnce = true

  public handle() {
    console.log('Executou o snoppet')
    if (!!window.monaco) {
      window.monaco.languages.registerCompletionItemProvider('javascript', {
        provideCompletionItems: () => this.GetMonacoSnippets(),
      })
      console.log('--------hehe-------')
      return true;
    } else {
        return false;
    }
  }

  private GetMonacoSnippets(): Array<Snippet> {
    return [this.MultilingueFunction()]
  }

  private MultilingueFunction(): Snippet {
    return {
      label: 'multilingue',
      kind: window.monaco.languages.CompletionItemKind.Snippet,
      documentation: 'Generate the fuction getMultilingueMessage',
      insertText: [
        `const getMultilingueMessage = (language) => {`,
        `\tconst messages = {`,
        `\t\tptBR: '',`,
        `\t\tesES: '',`,
        `\t\tenUS: '',`,
        `\t\tdefault: ''`,
        `\t};`,
        ``,
        `\treturn messages[language] || messages.default`,
        `}`,
      ].join('\n'),
    }
  }
}
