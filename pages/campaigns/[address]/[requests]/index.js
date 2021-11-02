import Link from "next/link";
import { useRouter } from "next/router";
import { Layout } from "../../../../components";
import { Button } from "semantic-ui-react";

export default function Requests() {
  const router = useRouter();
  const { address } = router.query;

  return (
    <Layout>
      <h3>Requests List</h3>
      <Link href={`/campaigns/${address}/requests/new`} passHref>
        <Button primary>Add Request</Button>
      </Link>
    </Layout>
  );
}
