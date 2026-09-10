# Bugmoog Stats backend

Small SQLite analytics service. Recent activity is stored per hour, event, and anonymous device. After 31 days it is compacted into daily totals and daily sets of 16-byte device hashes. Those sets preserve exact distinct-device counts across date ranges without retaining old hourly history or exposing device identifiers in API responses.

`GET /chet/bugmoog-stats/api/report/<from-ms>/<to-ms>/<hour|day|week>` returns graph rows and range-wide summaries. A null subject represents the event-wide total, deduplicated across games. Weeks begin Monday in UTC. Historical data compacted before this migration has unavailable device counts (`null`), not estimated counts. The original statistics, popularity, event, and health routes remain compatible.

Browser requests are restricted to the configured allowed origins. Run with Node.js 24 and configure `DATA_DIR`, `HOST`, `PORT`, and `ALLOWED_ORIGINS` as appropriate.
