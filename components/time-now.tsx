"use client";

import { useSyncExternalStore } from "react";

const formatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Jakarta",
  hour: "2-digit",
  minute: "2-digit",
});

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 30_000);
  return () => clearInterval(id);
}

/** Current time in Jakarta, updated every 30 seconds. */
export function TimeNow() {
  const time = useSyncExternalStore(
    subscribe,
    () => formatter.format(new Date()),
    () => "",
  );

  return <span suppressHydrationWarning>{time}</span>;
}
