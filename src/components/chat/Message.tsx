import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const message = ({ msg, senderId }) => {
  return (
    <div
      className={classNames("mb-4 w-fit max-w-[80%]", {
        "ml-auto": msg.senderId === senderId
      })}
    >
      <div
        className={classNames(
          "rounded-full bg-purple-400 py-2.5 px-4 text-white",
          {
            "ml-auto w-fit text-right": msg.senderId === senderId
          }
        )}
      >
        {msg.text}
      </div>
      <span className="text-sm">
        {new Date(msg.createdAt).toLocaleTimeString()}
      </span>
    </div>
  );
};

message.propTypes = {
  msg: PropTypes.object.isRequired,
  senderId: PropTypes.number
};

message.defaultProps = {
  msg: {},
  senderId: null
};
export default message;
