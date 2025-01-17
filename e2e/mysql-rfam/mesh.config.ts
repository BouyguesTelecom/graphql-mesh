import { defineConfig as defineComposeConfig } from '@bouygues-telecom/graphql-compose-cli';
import { loadMySQLSubgraph } from '@omnigraph/mysql';

export const composeConfig = defineComposeConfig({
  subgraphs: [
    {
      sourceHandler: loadMySQLSubgraph('Rfam', {
        endpoint: 'mysql://rfamro@mysql-rfam-public.ebi.ac.uk:4497/Rfam',
      }),
    },
  ],
});
