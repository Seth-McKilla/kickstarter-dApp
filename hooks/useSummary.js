import { useState, useEffect } from "react";
import Campaign from "../ethereum/campaign";

export default function useSummary(id) {
  const [summary, setSummary] = useState({
    minimumContribution: "",
    balance: "",
    requestsCount: "",
    approversCount: "",
    manager: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      if (!id) return;
      setLoading(true);
      try {
        const campaign = Campaign(id);
        const summary = await campaign.methods.getSummary().call();
        setSummary({
          minimumContribution: summary[0],
          balance: summary[1],
          requestsCount: summary[2],
          approversCount: summary[3],
          manager: summary[4],
        });
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
      return setLoading(false);
    })();
  }, [id]);

  return { loading, summary, error };
}
