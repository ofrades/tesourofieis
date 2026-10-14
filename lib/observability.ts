import { type Exit, Layer, Logger, References, Tracer } from "./effect";

/**
 * Console-backed observability for Effect programs (logger + tracer).
 *
 * Log output goes through `console.log`; completed spans longer than
 * SPAN_LOG_THRESHOLD_MS are reported through `console.debug` when the
 * minimum level includes Debug. Configure via
 * EXPO_PUBLIC_EFFECT_LOG_LEVEL (Trace|Debug|Info|Warn|Error|Fatal).
 */

const LEVELS = ["Trace", "Debug", "Info", "Warn", "Error", "Fatal"] as const;
type LevelName = (typeof LEVELS)[number];

function parseLevel(raw: string | undefined): LevelName | undefined {
  return LEVELS.find((level) => level === raw);
}

const minLevel: LevelName = parseLevel(process.env.EXPO_PUBLIC_EFFECT_LOG_LEVEL) ?? "Info";
const spanLoggingEnabled = minLevel === "Trace" || minLevel === "Debug";
const SPAN_LOG_THRESHOLD_MS = 5;

const consoleLogger = Logger.map((line: string) => {
  console.log(line);
})(Logger.formatSimple);

class LoggingSpan extends Tracer.NativeSpan {
  end(endTime: bigint, exit: Exit.Exit<unknown, unknown>): void {
    super.end(endTime, exit);
    if (!spanLoggingEnabled) return;
    const durationMs = Number(endTime - this.startTime) / 1_000_000;
    if (durationMs >= SPAN_LOG_THRESHOLD_MS) {
      console.debug(`[span] ${this.name} ${durationMs.toFixed(1)}ms`);
    }
  }
}

const consoleTracer = Tracer.make({
  span(options) {
    return new LoggingSpan(options);
  },
});

export const ObservabilityLive: Layer.Layer<never> = Layer.mergeAll(
  Logger.layer([consoleLogger]),
  Layer.succeed(References.MinimumLogLevel, minLevel),
  Layer.succeed(Tracer.Tracer, consoleTracer),
);
