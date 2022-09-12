import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="135" cy="135" r="125" />
    <rect x="-1" y="283" rx="11" ry="11" width="280" height="21" />
    <rect x="0" y="315" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="413" rx="10" ry="10" width="95" height="30" />
    <rect x="126" y="410" rx="25" ry="25" width="152" height="45" />
  </ContentLoader>
);

export default Skeleton;
