import React from "react";
import PropTypes from "prop-types";

function Home(props) {
  return (
    <div className="grid h-full place-content-center ">
      <p className="rounded-full bg-base-300 px-4 py-1 text-sm">
        Select a chat to start messaging
      </p>
    </div>
  );
}

Home.propTypes = {};

export default Home;
