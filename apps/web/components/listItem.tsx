export default function ListItem({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <li className="w-[60vw] border rounded-lg p-3 m-1 list-item">
      {children}
    </li>
  );
}
