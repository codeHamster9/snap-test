import React from "react";
import PropTypes from "prop-types";

const Card = ({ title, subtitle, imageUrl }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow">
      <img
        className="w-full"
        src={imageUrl}
        alt={title}
        style={{ minHeight: 384, minWidth: 384 }}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 truncate">{title}</div>
        <p className="text-gray-700 text-base">{subtitle}</p>
      </div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
};

Card.defaultProps = {
  imageUrl: "http://placehold.jp/380x380.png",
};

export default Card;
