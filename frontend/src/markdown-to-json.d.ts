// markdown-to-json.d.ts

declare module 'markdown-to-json' {
    interface MarkdownJson {
      content: string;
      attributes: {
        [key: string]: any;
      };
    }
  
    function convert(markdown: string): Promise<MarkdownJson>;
  
    export = {
      convert
    };
  }
  