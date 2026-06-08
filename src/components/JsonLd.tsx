/**
 * Renders one or more JSON-LD objects as <script type="application/ld+json">.
 * Pass a single schema object or an array; nullish entries are skipped.
 */
export default function JsonLd({
  data,
}: {
  data: Record<string, unknown> | (Record<string, unknown> | null | undefined)[];
}) {
  const items = (Array.isArray(data) ? data : [data]).filter(
    (d): d is Record<string, unknown> => Boolean(d)
  );
  if (!items.length) return null;

  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
