import { useEffect } from "react";
import PropTypes from "prop-types";
import { github } from "@/api";

function UserResults({ user: { login, avatar_url } }) {
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const params = {};
    github.searchUsers(params);
  };

  return <div>UserResults {avatar_url}</div>;
}

UserResults.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserResults;
