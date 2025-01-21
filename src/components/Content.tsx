interface contentI {
  children?: React.ReactNode;
}
export const Content = ({ children }: contentI) => {
  return <div className="content">{children}</div>;
};
