export default interface NodeInterface {
  getContent(): string;

  getChildren(): [];

  parseCustomizerData(data): boolean;
}
