import { Opts } from '@e2e/opts';
import { defineConfig } from '@bouygues-telecom/graphql-compose-cli';
import { loadMySQLSubgraph } from '@omnigraph/mysql';

const opts = Opts(process.argv);

export const composeConfig = defineConfig({
  subgraphs: [
    {
      sourceHandler: loadMySQLSubgraph('Employees', {
        endpoint: `mysql://root:passwd@localhost:${opts.getServicePort('employees')}/employees`,
      }),
    },
  ],
});
