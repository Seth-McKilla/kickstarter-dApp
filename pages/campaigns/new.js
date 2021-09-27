import { useState } from "react";
import { Form, Input, Button } from "semantic-ui-react";
import { Layout } from "../../components";

export default function New() {
  const [minContribution, setMinContribution] = useState("");

  return (
    <Layout>
      <h3>Create a Campaign</h3>

      <Form>
        <Form.Field>
          <label>Minimum Contribution</label>
          <Input
            label="wei"
            labelPosition="right"
            value={minContribution}
            onChange={(e) => setMinContribution(e.target.value)}
          />
        </Form.Field>

        <Button primary>Create!</Button>
      </Form>
    </Layout>
  );
}
