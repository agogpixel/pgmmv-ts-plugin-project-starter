import { createPlugin as createBasePlugin, PluginProtectedApi } from '@agogpixel/pgmmv-plugin-support';
import { JsonValue } from '@agogpixel/pgmmv-ts/api';

import localizations from './locale';

/**
 *
 */
type InternalData = JsonValue;

/**
 *
 * @returns
 */
export function createPlugin() {
  /**
   * Contains methods and properties from the base plugin that are meant for internal use
   * in our plugin.
   */
  const internalApi = {} as PluginProtectedApi<InternalData>;

  /**
   * Create our plugin instance - we provide our plugin localization data and our internal
   * object from above
   */
  const self = createBasePlugin<InternalData>({ localizations }, internalApi);

  // TODO: override examples on our public and internal plugin objects...

  return self;
}
