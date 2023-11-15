module.exports = {
  partners: {
    output: {
      mode: "tags",
      headers: false,
      target: "./api/partners/partners.ts",
      schemas: "./api/partners/types",
      client: "react-query",
      mock: false,
      override: {
        mutator: {
          path: "custom-instance.ts",
          name: "customInstance",
        },
        query: {
          signal: false,
        },
      },
    },

    input: {
      target: "./test.json",
    },
  },
};
