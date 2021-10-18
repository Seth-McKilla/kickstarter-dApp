import { useState } from "react";
import { Form, Input, Button, Message } from "semantic-ui-react";
import { Layout } from "../../components";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { useRouter } from "next/router";

export default function New() {
  const router = useRouter();

  const [minContribution, setMinContribution] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods.createCampaign(minContribution).send({
        from: accounts[0],
      });
      router.push("/");
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }

    return setLoading(false);
  };

  return (
    <Layout>
      <h3>Create a Campaign</h3>

      <Form onSubmit={onSubmit} error={!!errorMessage}>
        <Form.Field>
          <label>Minimum Contribution</label>
          <Input
            label="wei"
            labelPosition="right"
            value={minContribution}
            onChange={(e) => setMinContribution(e.target.value)}
          />
        </Form.Field>

        <Message error header="Oops!" content={errorMessage} />
        <Button primary loading={loading} disabled={loading}>
          Create!
        </Button>
      </Form>
    </Layout>
  );
}
