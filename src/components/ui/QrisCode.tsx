"use client";

/**
 * QR code simulasi untuk tampilan pembayaran QRIS.
 * Pola dibuat deterministik dari kode pesanan supaya konsisten tiap render,
 * tapi ini BUKAN payload QRIS asli — ganti dengan QR dari payment gateway
 * saat integrasi pembayaran sudah tersedia.
 */

const GRID = 25;
const FINDER = 7;

const createRandom = (seed: string) => {
  let hash = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return () => {
    hash ^= hash << 13;
    hash ^= hash >>> 17;
    hash ^= hash << 5;
    return (hash >>> 0) / 4294967296;
  };
};

const isFinderArea = (x: number, y: number) => {
  const inBox = (startX: number, startY: number) =>
    x >= startX && x < startX + FINDER + 1 && y >= startY && y < startY + FINDER + 1;

  return (
    inBox(0, 0) ||
    inBox(GRID - FINDER - 1, 0) ||
    inBox(0, GRID - FINDER - 1)
  );
};

const Finder = ({ x, y }: { x: number; y: number }) => (
  <>
    <rect x={x} y={y} width={FINDER} height={FINDER} fill="currentColor" />
    <rect x={x + 1} y={y + 1} width={FINDER - 2} height={FINDER - 2} fill="#fff" />
    <rect x={x + 2} y={y + 2} width={FINDER - 4} height={FINDER - 4} fill="currentColor" />
  </>
);

type PropTypes = {
  value: string;
  className?: string;
};

const QrisCode = ({ value, className }: PropTypes) => {
  const random = createRandom(value);
  const modules: { x: number; y: number }[] = [];

  for (let y = 0; y < GRID; y++) {
    for (let x = 0; x < GRID; x++) {
      if (isFinderArea(x, y)) continue;
      if (random() > 0.52) modules.push({ x, y });
    }
  }

  return (
    <svg
      viewBox={`-1 -1 ${GRID + 2} ${GRID + 2}`}
      role="img"
      aria-label={`QR code pembayaran ${value}`}
      className={className}
      style={{ color: "#111" }}
    >
      <rect x={-1} y={-1} width={GRID + 2} height={GRID + 2} fill="#fff" />
      <Finder x={0} y={0} />
      <Finder x={GRID - FINDER} y={0} />
      <Finder x={0} y={GRID - FINDER} />
      {modules.map((module) => (
        <rect
          key={`${module.x}-${module.y}`}
          x={module.x}
          y={module.y}
          width={1}
          height={1}
          fill="currentColor"
        />
      ))}
    </svg>
  );
};

export default QrisCode;
