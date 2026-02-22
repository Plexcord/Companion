/*
 * Plexcord, a modification for Discord's desktop app
 * Copyright (c) 2022 Vendicated and contributors
 * Copyright (c) 2025 MutanPlex
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

/*
 * Plexcord, a modification for Discord's desktop app
 * Copyright (c) 2022 Vendicated and contributors
 * Copyright (c) 2025 MutanPlex
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
/// <reference lib="es2021.string" />
import { FindNode } from "@type/server";

import { runtimeHashMessageKey } from "./intlHash";

export type PlexcordReplaceFn = (match: string, ...groups: any[]) => string;

export const intlRegex = /#{intl::([\w$+/]*)(?:::(\w+))?}/g;

export function canonicalizeMatch<T extends RegExp | string>(match: T): T {
    let partialCanon = typeof match === "string" ? match : match.source;

    partialCanon = partialCanon.replaceAll(intlRegex, (_, key, modifier) => {
        const hashed = modifier === "raw" ? key : runtimeHashMessageKey(key);
        const isString = typeof match === "string";
        const hasSpecialChars = !Number.isNaN(Number(hashed[0])) || hashed.includes("+") || hashed.includes("/");

        if (hasSpecialChars) {
            return isString
                ? `["${hashed}"]`
                : String.raw`(?:\["${hashed}"\])`.replaceAll("+", "\\+");
        }

        return isString ? `.${hashed}` : String.raw`(?:\.${hashed})`;
    });

    if (typeof match === "string") {
        return partialCanon as T;
    }

    const canonSource = partialCanon.replaceAll("\\i", String.raw`(?:[A-Za-z_$][\w$]*)`);

    return new RegExp(canonSource, match.flags) as T;
}

export function canonicalizeReplace<T extends string | PlexcordReplaceFn>(replace: T, pluginName: string): T {
    const self = `Plexcord.Plugins.plugins[${JSON.stringify(pluginName)}]`;

    if (typeof replace !== "function")
        return replace.replaceAll("$self", self) as T;

    return ((...args) => replace(...args)
        .replaceAll("$self", self)) as T;
}

export function parseMatch(node: FindNode): string | RegExp {
    return parseNode(node);
}

export function parseReplace(node: FindNode): string | PlexcordReplaceFn {
    return parseNode(node);
}
function parseNode(node: FindNode) {
    switch (node.type) {
        case "string":
            return node.value;
        case "regex":
            return new RegExp(node.value.pattern, node.value.flags);
        case "function":
            // We LOVE remote code execution
            // Safety: This comes from localhost only, which actually means we have less permissions than the source,
            // since we're running in the browser sandbox, whereas the sender has host access
            return (0, eval)(node.value);
        default:
            throw new Error(`Unknown Node Type ${(node as any).type}`);
    }
}
