type PlaceholderProps = {
  label?: string;
  className?: string;
};

export default function Placeholder({
  label = "Imagen de ejemplo",
  className = "",
}: PlaceholderProps) {
  return (
    <div
      className={`flex h-full w-full items-center justify-center bg-neutral-200 p-4 text-center text-sm font-medium tracking-wide text-neutral-500 ${className}`}
    >
      {label}
    </div>
  );
}
