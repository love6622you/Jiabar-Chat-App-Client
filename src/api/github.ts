import request from "../lib/request";

// const baseUrl = "/api/v1";
function searchUsers(params) {
  return request({
    url: "search/users",
    method: "GET",
    params
  });
}

export const github = {
  searchUsers
};
