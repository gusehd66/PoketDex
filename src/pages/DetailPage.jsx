import { useState } from "react";
import { useParams } from "react-router-dom";
import Tabs from "../components/Tabs";

const DetailPage = () => {
  const { id } = useParams();
  const [selectedTab, setSelectedTab] = useState("about");

  const handleClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div>
      <Tabs
        tab={selectedTab}
        onClick={handleClick}
        color={{ name: "red", url: "" }}
      />
    </div>
  );
};

export default DetailPage;
