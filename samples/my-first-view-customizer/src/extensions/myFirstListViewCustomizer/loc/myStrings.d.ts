declare interface IMyFirstListViewCustomizerCommandSetStrings {
  Command1: string;
  Command2: string;
}

declare module 'MyFirstListViewCustomizerCommandSetStrings' {
  const strings: IMyFirstListViewCustomizerCommandSetStrings;
  export = strings;
}
