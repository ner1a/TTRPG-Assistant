export default function ListItem({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <li className="w-[60vw] border rounded-lg border-white bg-slate-900 p-3 m-1">
      {children}
    </li>
  );
}
