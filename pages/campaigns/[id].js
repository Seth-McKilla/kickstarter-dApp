import { useRouter } from "next/router";
import { Layout, ContributeForm } from "../../components";
import { Card } from "semantic-ui-react";
import useSummary from "../../hooks/useSummary";
import web3 from "../../ethereum/web3";

export default function CampaignShow() {
  const router = useRouter();
  const { id } = router.query;

  const {
    summary: {
      minimumContribution,
      balance,
      requestsCount,
      approversCount,
      manager,
    },
  } = useSummary(id);

  const renderCards = () => {
    const items = [
      {
        header: manager,
        meta: "Address of manager",
        description:
          "The manager created this campaign and can create requests to withdraw money.",
        style: { overflowWrap: "break-word" },
      },
      {
        header: minimumContribution,
        meta: "Minimum Contribution (wei)",
        description:
          "You must contribute at least this much wei to become an approver.",
      },
      {
        header: requestsCount,
        meta: "Number of Requests",
        description:
          "A request tries to withdraw money from the contract. Requests must be approved by the approvers.",
      },
      {
        header: approversCount,
        meta: "Number of Approvers",
        description:
          "Number of people who have already donated to this campaign",
      },
      {
        header: web3.utils.fromWei(balance, "ether"),
        meta: "Campaign Balance (ether)",
        description:
          "The balance is how much money this campaign has left to spend.",
      },
    ];

    return <Card.Group items={items} />;
  };

  return (
    <Layout>
      {renderCards()}
      <ContributeForm />
    </Layout>
  );
}
