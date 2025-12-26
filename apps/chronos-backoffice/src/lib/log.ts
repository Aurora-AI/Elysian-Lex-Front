type LogEvent = {
  organ: "chronos";
  action: string;
  status: "success" | "failure" | "info";
  meta?: Record<string, unknown>;
};

export function logEvent(evt: LogEvent) {
  const payload = JSON.stringify(evt);
  if (evt.status === "failure") {
    // eslint-disable-next-line no-console
    console.error(payload);
    return;
  }
  // eslint-disable-next-line no-console
  console.log(payload);
}
