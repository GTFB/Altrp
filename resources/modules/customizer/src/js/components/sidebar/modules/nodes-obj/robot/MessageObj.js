import MessageIcon from "../../../../../../svgs/message.svg";
import Send from "../../robot/data/action/Send";
import MessageAction from "../../robot/widgets/MessageAction";

export const MessageObj = {
  title: 'Message',
  name: 'messageAction',
  selectedNode: Send,
  node: MessageAction,
  icon: MessageIcon,
  type: "robot",
}
