import Link from "next/link";
import { Layout, RequestRow } from "../../../../components";
import { Button, Table } from "semantic-ui-react";
import Campaign from "../../../../ethereum/campaign";

export default function Requests({ address, requests, approversCount }) {
  const { Header, Row, HeaderCell, Body } = Table;

  const renderRows = () =>
    requests.map((request, index) => (
      <RequestRow
        key={index}
        id={index}
        request={request}
        address={address}
        approversCount={approversCount}
      />
    ));

  return (
    <Layout>
      <h3>Requests List</h3>
      <Link href={`/campaigns/${address}/requests/new`} passHref>
        <Button primary>Add Request</Button>
      </Link>
      <Table>
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Approval Count</HeaderCell>
            <HeaderCell>Approve</HeaderCell>
            <HeaderCell>Finalize</HeaderCell>
          </Row>
        </Header>
        <Body>{renderRows()}</Body>
      </Table>
    </Layout>
  );
}

export async function getServerSideProps(props) {
  const { address } = props.query;
  const campaign = Campaign(address);
  const requestCount = await campaign.methods.numRequests().call();
  const approversCount = await campaign.methods.approversCount().call();
  const requests = [];
  for (let i = 0; i <= parseInt(requestCount); i++) {
    const request = await campaign.methods.requests(i).call();
    requests.push({ ...request });
  }

  return { props: { address, requests, requestCount, approversCount } };
}
