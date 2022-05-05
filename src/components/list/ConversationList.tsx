import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CoversationItem from "../item/CoversationItem";
import { useQuery } from "@apollo/client";
import { GET_ALL_USERS } from "@/graphql/queries";
import { useNavigate, useParams } from "react-router-dom";
import { useStore } from "@/store/index";

const ConversationList = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [selectedUser, setSelectedUser] = useState<string>("0");
  const updateSelectedUser = (value) => {
    setSelectedUser(value);
  };

  const setAllFriends = useStore((state) => state.setAllFriends);

  const {
    loading,
    data: allUserList,
    error,
    refetch: retchAllUserList
  } = useQuery(GET_ALL_USERS, {
    onCompleted: (data) => {
      setAllFriends(data.users);
    }
  });

  useEffect(() => {
    retchAllUserList();
  }, [retchAllUserList]);

  return (
    <div className="flex h-full flex-col overflow-y-auto">
      {loading ? (
        <></>
      ) : (
        allUserList?.users?.map((item) => {
          return (
            <CoversationItem
              key={item.id}
              item={item}
              selectedUser={selectedUser}
              updateSelectedUser={() => {
                updateSelectedUser(item.id);
                navigate(`/chat/${item.id}`);
              }}
            />
          );
        })
      )}
    </div>
  );
};

ConversationList.propTypes = {};

export default ConversationList;
