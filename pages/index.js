import Link from "next/link";
import factory from "../ethereum/factory";
import { Card, Button } from "semantic-ui-react";
import { Layout } from "../components";

export default function Home({ campaigns }) {
  const renderCampaigns = () => {
    const items = campaigns.map((address) => {
      return {
        header: address,
        description: (
          <Link href={`/campaigns/${encodeURIComponent(address)}`}>
            <a>View Campaign</a>
          </Link>
        ),
        fluid: true,
      };
    });
    return <Card.Group items={items} />;
  };

  return (
    <Layout>
      <div>
        <h3>Open Campaigns</h3>
        <Link href="/campaigns/new">
          <a>
            <Button
              floated="right"
              content="Create Campaign"
              icon="add"
              primary
            />
          </a>
        </Link>
        {renderCampaigns()}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  try {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { props: { campaigns } };
  } catch (error) {
    console.log(error.message);
  }
}
