import { LemmaClient } from "lemma-sdk";

let client = null;

export const initLemma = async () => {
  if (!client) {
    client = new LemmaClient({
      podId: "019f0890-f38f-7240-91d5-723b84d3c2f2",
    });

    await client.initialize();
  }

  return client;
};

export const getLemmaClient = () => client;