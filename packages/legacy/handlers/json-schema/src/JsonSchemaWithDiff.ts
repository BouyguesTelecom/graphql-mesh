import { compareJSONSchemas } from '@bouygues-telecom/graphql-json-machete/src';
import type { ProxyOptions } from '@graphql-mesh/store';
import { PredefinedProxyOptions } from '@graphql-mesh/store';
import type { JSONSchemaObject } from '@json-schema-tools/meta-schema';

export const JsonSchemaWithDiff: ProxyOptions<JSONSchemaObject> = {
  ...PredefinedProxyOptions.JsonWithoutValidation,
  validate: compareJSONSchemas,
};
