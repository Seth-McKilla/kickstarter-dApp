import React from "react";
import { useRouter } from "next/router";
import { Layout } from "../../components";

export default function Campaign() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout>
      <h2>{id}</h2>
    </Layout>
  );
}
