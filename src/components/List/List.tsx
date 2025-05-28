

type ListProps = {
  columns?: number;
  children: React.ReactNode;
};

export default function List({ columns = 3, children }: ListProps) {
  return (
    <div className={`grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-${columns}`}>
      {children}
    </div>
  );
}
