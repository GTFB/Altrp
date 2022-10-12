import BaseNode from "./BaseNode"

export default interface NodeInterface
{
    getContent():string

    getChildren(): BaseNode[]
}
