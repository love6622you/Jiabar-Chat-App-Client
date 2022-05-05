import React, { useState } from "react";
import PropTypes from "prop-types";
import Avatar from "../common/Avatar";
import classNames from "classnames";

const CoversationItem = ({ item, selectedUser, updateSelectedUser }) => {
  // 切換 user 會有卡頓的情況??? 而且會重新 render 此 item

  return (
    <div
      className={classNames(
        "grid cursor-pointer grid-cols-[auto_1fr] gap-x-4 px-8 py-6  hover:bg-base-300",
        { "bg-base-300": selectedUser === item.id }
      )}
      onClick={updateSelectedUser}
    >
      <Avatar
        size="w-14 h-14"
        src={`https://api.lorem.space/image/face?hash=${item.id}`}
      />

      <div>
        <p className="text-lg font-medium text-purple-400">
          {item.firstName}
          {item.lastName}
        </p>
        {/* <p className="line-clamp-1">
          {"I got two ticket to goo see this awesome asdf jeiq"}
        </p> */}
      </div>
    </div>
  );
};

CoversationItem.propTypes = {
  item: PropTypes.object.isRequired,
  selectedUser: PropTypes.string.isRequired,
  updateSelectedUser: PropTypes.func
};

export default CoversationItem;
