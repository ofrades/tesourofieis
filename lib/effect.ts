/**
 * The Effect modules the app uses, re-exported one module at a time.
 *
 * The `effect` package barrel re-exports 136 modules as namespaces, and Metro
 * does not tree-shake it, so importing from the package root pulls the whole
 * 50 MB library into the launch bundle. Import from here instead, or as a
 * direct `effect/<Module>` subpath.
 */
export * as Context from "effect/Context";
export * as Effect from "effect/Effect";
export type * as Exit from "effect/Exit";
export * as Layer from "effect/Layer";
export * as Logger from "effect/Logger";
export * as Option from "effect/Option";
export * as References from "effect/References";
export * as Schema from "effect/Schema";
export * as Tracer from "effect/Tracer";
