"use client";

import { useEffect, useRef } from "react";
import { track, type TrackEvent } from "@/lib/analytics";

/**
 * Fires an entity-scoped view event once on mount (e.g. view_university,
 * view_course) so the tracker panel can attribute page views to a specific
 * university or course. Renders nothing.
 */
export default function EntityView({
  event,
  entityType,
  entityId,
  path,
}: {
  event: TrackEvent;
  entityType: "university" | "course";
  entityId: string;
  path?: string;
}) {
  const fired = useRef(false);
  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    track(event, { entityType, entityId, path: path ?? window.location.pathname });
  }, [event, entityType, entityId, path]);
  return null;
}
