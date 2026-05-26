import type { PropsWithChildren } from "react";
import Container from "@/components/layout/Container";

interface Props {
  name: string;
}
const BasePageLayout = ({ name, children }: PropsWithChildren<Props>) => {
  return (
    <Container className="my-4 flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-primary">{name}</h1>
      <div className="flex flex-col gap-4">{children}</div>
    </Container>
  );
};

export default BasePageLayout;
