import { compareJSONSchemas } from '@bouyguestelecom/graphql-json-machete';
import type { ProxyOptions } from '@graphql-mesh/store';
import { PredefinedProxyOptions } from '@graphql-mesh/store';
import type { JSONSchemaObject } from '@json-schema-tools/meta-schema';

export const JsonSchemaWithDiff: ProxyOptions<JSONSchemaObject> = {
  ...PredefinedProxyOptions.JsonWithoutValidation,
  validate: compareJSONSchemas,
};
