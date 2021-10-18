import { useState } from "react";
import { useRouter } from "next/router";
import { Button, Form, Input, Message } from "semantic-ui-react";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";

export default function ContributeForm({ address }) {
  const router = useRouter();

  const [value, setValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErrorMessage("");

    const campaign = Campaign(address);

    try {
      const accounts = await web3.eth.getAccounts();

      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(value, "ether"),
      });

      router.reload(window.location.pathname);
    } catch (error) {
      setErrorMessage(error.message);
    }

    setValue("");
    return setLoading(false);
  };

  return (
    <Form onSubmit={handleSubmit} error={!!errorMessage}>
      <Form.Field>
        <label>Amount to Contribute</label>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          label="ether"
          labelPosition="right"
        />
      </Form.Field>
      <Message error header="Oops!" content={errorMessage} />
      <Button primary loading={loading} disabled={loading}>
        Contribute!
      </Button>
    </Form>
  );
}
