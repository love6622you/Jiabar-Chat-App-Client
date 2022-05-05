import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Avatar from "@/components/common/Avatar";
import Message from "@/components/chat/Message";
import MessageInput from "@/components/chat/MessageInput";
import {
  ChatAltIcon,
  VideoCameraIcon,
  PhoneIcon
} from "@heroicons/react/solid";
import { useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useStore } from "@/store/index";

// graphql
import { useQuery, useMutation, useSubscription } from "@apollo/client";
import { GET_MSG } from "@/graphql/queries";
import { SEND_MSG } from "@/graphql/mutations";
import { MSG_SUB } from "@/graphql/subscriptions";

type msgType = {
  id: string;
  receiverId: number;
  senderId: number;
  text: string;
  createdAt: string;
};

const ChatView = () => {
  const msgChatRef = useRef<HTMLDivElement>(null);
  const { id } = useParams();

  const token = useStore().token;
  const { userId }: { userId: number } = jwt_decode(token);

  const getFriendName = useStore.getState().getFriendName(id);

  const [msgText, setMsgText] = useState();
  const [messages, setMessages] = useState<msgType[]>([]);

  // Query
  const { loading: msgLoading, refetch: refetchMsg } = useQuery(GET_MSG, {
    variables: {
      receiverId: Number(id)
    },
    onCompleted(data) {
      setMessages(data.messagesByUser);
    }
  });

  // Mutation
  const [sendMessage] = useMutation(SEND_MSG);

  // Subcription
  useSubscription(MSG_SUB, {
    onSubscriptionData({ subscriptionData: { data } }) {
      if (
        (data.messageAdded.receiverId === Number(id) &&
          data.messageAdded.senderId === userId) ||
        (data.messageAdded.receiverId === userId &&
          data.messageAdded.senderId === Number(id))
      ) {
        setMessages((prevMessages) => [...prevMessages, data.messageAdded]);
      }
    }
  });

  useEffect(() => {
    if (msgChatRef.current) {
      msgChatRef.current.scrollTo(0, msgChatRef.current.scrollHeight);
    }
  }, [messages]);

  useEffect(() => {
    refetchMsg();
  }, [id, refetchMsg]);

  const [chatMode, setChatMode] = useState<string>("Chat");
  const renderChatMode = () => {
    const style = "h-8 w-8 cursor-pointer hover:text-gray-300 ";
    return (
      <>
        <ChatAltIcon className={style} onClick={() => setChatMode("Chat")} />
        <VideoCameraIcon
          className={style}
          onClick={() => setChatMode("Video")}
        />
        <PhoneIcon className={style} onClick={() => setChatMode("Phone")} />
      </>
    );
  };

  return (
    <div className="grid h-full grid-rows-[75px_1fr_75px]">
      {/* Title View */}
      <div className="flex items-center justify-between px-8">
        <div className="flex items-center gap-x-4">
          <Avatar src={`https://api.lorem.space/image/face?hash=${id}`} />
          <span>{getFriendName}</span>
        </div>
        <div className="btn-group gap-x-5">{renderChatMode()}</div>
      </div>

      {/* Msg View */}
      <div ref={msgChatRef} className="overflow-y-auto px-8">
        {msgLoading ? (
          <div>Loading chats</div>
        ) : (
          messages.map((msg) => {
            return <Message key={msg.id} msg={msg} senderId={userId} />;
          })
        )}
      </div>

      {/* Input View */}
      <div className="flex h-full items-center gap-4 bg-base-200 px-8">
        <MessageInput
          msgText={msgText}
          setMsgText={setMsgText}
          sendMessage={() => {
            sendMessage({
              variables: {
                receiverId: Number(id),
                text: msgText
              }
            });
          }}
        />
      </div>
    </div>
  );
};

ChatView.propTypes = {};

export default ChatView;
