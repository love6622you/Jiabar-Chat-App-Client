import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const Avatar = ({ src, isOnline, size }) => {
  return (
    <div className={classNames("avatar", { online: isOnline })}>
      <div className={`${size} rounded-full`}>
        <img src={src ?? "https://api.lorem.space/image/face?hash=28292"} />
      </div>
    </div>
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
  size: PropTypes.string,
  isOnline: PropTypes.bool
};

Avatar.defaultProps = {
  src: null,
  size: "w-12 h-12",
  isOnline: false
};

export default Avatar;
