"use client";

import { sendGAEvent, sendGTMEvent } from "@next/third-parties/google";

export const reportEvent = (event: string, properties: Record<string, any>) => {
  sendGAEvent("event", event, properties);
  sendGTMEvent({ event, value: properties });
};
