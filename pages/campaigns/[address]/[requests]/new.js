import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Campaign from "../../../../ethereum/campaign";
import web3 from "../../../../ethereum/web3";
import { Layout } from "../../../../components";
import { Form, Button, Message, Input } from "semantic-ui-react";

export default function New() {
  const router = useRouter();
  const { address } = router.query;

  const [request, setRequest] = useState({
    description: "",
    value: "",
    recipient: "",
    loading: false,
    errorMessage: "",
  });

  const handleChange = (e) =>
    setRequest((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const campaign = Campaign(address);

    setRequest((prev) => {
      return {
        ...prev,
        loading: true,
        errorMessage: "",
      };
    });

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(
          request.description,
          web3.utils.toWei(request.value, "ether"),
          request.recipient
        )
        .send({
          from: accounts[0],
        });

      router.push(`/campaigns/${address}/requests`);
    } catch (error) {
      setRequest((prev) => {
        return {
          ...prev,
          errorMessage: error.message,
        };
      });
    }

    return setRequest((prev) => {
      return {
        ...prev,
        loading: false,
      };
    });
  };

  return (
    <Layout>
      <Link href={`/campaigns/${address}/requests`} passHref>
        <a>Back</a>
      </Link>
      <h3>Create a Request</h3>
      <Form onSubmit={handleSubmit} error={!!request.errorMessage}>
        <Form.Field>
          <label>Description</label>
          <Input
            name="description"
            value={request.description}
            onChange={handleChange}
          />
        </Form.Field>

        <Form.Field>
          <label>Value in Ether</label>
          <Input name="value" value={request.value} onChange={handleChange} />
        </Form.Field>

        <Form.Field>
          <label>Recipient</label>
          <Input
            name="recipient"
            value={request.recipient}
            onChange={handleChange}
          />
        </Form.Field>

        <Message error header="Oops!" content={request.errorMessage} />
        <Button primary loading={request.loading}>
          Create!
        </Button>
      </Form>
    </Layout>
  );
}
