import factory from "../ethereum/factory";
import { Card, Button } from "semantic-ui-react";
import { Layout } from "../components";

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

  return (
    <Layout>
      <div>
        <h3>Open Campaigns</h3>
        <Button floated="right" content="Create Campaign" icon="add" primary />
        {renderCampaigns()}
      </div>
    </Layout>
  );
}

Home.getInitialProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return { campaigns };
};

export default Home;
