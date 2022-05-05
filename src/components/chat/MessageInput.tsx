import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { MicrophoneIcon, ChevronRightIcon } from "@heroicons/react/solid";

const InputBar = ({ msgText, setMsgText, sendMessage }) => {
  // Todo Throttle
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const sendMsg = () => {
    if (!msgText) return;
    sendMessage();
    setMsgText("");
  };

  return (
    <>
      <textarea
        ref={textareaRef}
        className="w-full resize-none border-none bg-transparent p-0 focus:ring-0"
        placeholder="Write a message..."
        value={msgText}
        onInput={(e) => {
          setMsgText(e.currentTarget.value);
        }}
        onKeyDown={(e) => {
          const key = e.key;
          if (key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMsg();
          }
        }}
      />

      <div className="flex">
        {msgText ? (
          <ChevronRightIcon
            className="h-8 w-8 cursor-pointer rounded-full bg-sky-900"
            onClick={sendMsg}
          />
        ) : (
          <MicrophoneIcon className="h-8 w-8 cursor-pointer" />
        )}
      </div>
    </>
  );
};

InputBar.propTypes = {
  msgText: PropTypes.string,
  setMsgText: PropTypes.func,
  sendMessage: PropTypes.func
};

export default InputBar;
