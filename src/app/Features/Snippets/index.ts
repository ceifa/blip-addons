import type { Snippet } from '../../types'
import { BaseFeature } from '@features/BaseFeature'

export class MonacoSnippet extends BaseFeature {
  public static shouldRunOnce = true

  public handle() {
    if (!!window.monaco) {
      window.monaco.languages.registerCompletionItemProvider('javascript', {
        provideCompletionItems: () => this.GetMonacoSnippets(),
      })
      return true
    } else {
      return false
    }
  }

  private GetMonacoSnippets(): Array<Snippet> {
    return [this.MultilingueFunction(), this.WhatsappTemplateMessage(), this.RedirectMessage()]
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

  private WhatsappTemplateMessage(): Snippet {
    return {
      label: 'template',
      kind: window.monaco.languages.CompletionItemKind.Snippet,
      documentation: 'Generate the fuction getWhatsappTemplate',
      insertText: [
        `const getWhatsappTemplate = () => {`,
        `\tconst template = {};`,
        `\ttemplate.type = 'application/json';`,
        `\ttemplate.content = {`,
        `\t\t"type": "template",`,
        `\t\t"template": {`,
        `\t\t\t"namespace": "NAMESPACE_WABA",`,
        `\t\t\t"name": "TEMPLATE_NAME",`,
        `\t\t\t"language": {`,
        `\t\t\t\t"policy": "deterministic",`,
        `\t\t\t\t"code": "pt_BR"`,
        `\t\t\t}`,
        `\t\t}`,
        `\t}`,
        ``,
        `\treturn template;`,
        `}`,
      ].join('\n'),
    }
  }

  private RedirectMessage(): Snippet {
    return {
      label: 'redirect',
      kind: window.monaco.languages.CompletionItemKind.Snippet,
      documentation: 'Generate the fuction getRedirectMessage',
      insertText: [
        `const getRedirectMessage = () => {`,
        `\treturn {`,
        `\t\torigin: {`,
        `\t\t\tserviceName: "SERVICE_ORIGIN_NAME",`,
        `\t\t\tstateName: "STATE_ORIGIN_NAME"`,
        `\t\t},`,
        ``,
        `\t\tdestination: {`,
        `\t\t\tserviceName: "SERVICE_DESTINATION_NAME",`,
        `\t\t\tstateName: "STATE_DESTINATION_NAME"`,
        `\t\t},`,
        ``,
        `\t\tuserInput: {`,
        `\t\t\ttype: "text/plain",`,
        `\t\t\tcontent: "default",`,
        `\t\t},`,
        ``,
        `\t\tcustom: {},`,
        `\t};`,
        `}`,
      ].join('\n'),
    }
  }
}
