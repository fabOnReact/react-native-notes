/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 * @format
 */

'use strict';

import type {
  NativeModuleAliasMap,
  NativeModuleEnumMembers,
  NativeModuleObjectTypeAnnotation,
  NativeModuleSchema,
  SchemaType,
} from '../../CodegenSchema';

const invariant = require('invariant');

export type AliasResolver = (
  aliasName: string,
) => NativeModuleObjectTypeAnnotation;

function createAliasResolver(aliasMap: NativeModuleAliasMap): AliasResolver {
  return (aliasName: string) => {
    const alias = aliasMap[aliasName];
    invariant(alias != null, `Unable to resolve type alias '${aliasName}'.`);
    return alias;
  };
}

function getModules(
  schema: SchemaType,
): $ReadOnly<{[hasteModuleName: string]: NativeModuleSchema}> {
  return Object.keys(schema.modules).reduce<{[string]: NativeModuleSchema}>(
    (modules, hasteModuleName: string) => {
      const module = schema.modules[hasteModuleName];
      if (module == null || module.type === 'Component') {
        return modules;
      }
      modules[hasteModuleName] = module;
      return modules;
    },
    {},
  );
}

function getAreEnumMembersInteger(members: NativeModuleEnumMembers): boolean {
  return !members.some(m => `${m.value}`.includes('.'));
}

module.exports = {
  createAliasResolver,
  getModules,
  getAreEnumMembersInteger,
};
