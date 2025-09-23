declare module "react-rte" {
  import * as React from "react";

  export type EditorValue = {
    toString(format?: string): string;
  };

  export interface RichTextEditorProps {
    value: EditorValue;
    onChange: (value: EditorValue) => void;
  }

  export default class RichTextEditor extends React.Component<RichTextEditorProps> {
    static createValueFromString(markup: string, format: string): EditorValue;
  }
}
