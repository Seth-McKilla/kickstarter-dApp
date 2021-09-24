import "semantic-ui-css/semantic.min.css";
import * as React from "react";
import factory from "../ethereum/factory";
import { Card } from "semantic-ui-react";

function Home({ campaigns }) {
  const renderCampaigns = () => {
    const items = campaigns.map((address) => {
      return {
        header: address,
        description: <a>View Campaign</a>,
        fluid: true,
      };
    });
    return <Card.Group items={items} />;
  };

  return <div>{renderCampaigns()}</div>;
}

Home.getInitialProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return { campaigns };
};

export default Home;
