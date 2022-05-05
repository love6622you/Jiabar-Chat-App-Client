import React from "react";
import PropTypes from "prop-types";
import ConversationList from "@/components/list/ConversationList";
import SearchBar from "@/components/common/SearchBar";

const Sidebar = (props) => {
  return (
    <div className="flex h-full flex-col border-r border-base-300">
      <SearchBar spacing={"py-4 px-4"} />
      <ConversationList />
    </div>
  );
};

Sidebar.propTypes = {};

export default Sidebar;
