import BasePageLayout from "@/components/layout/BasePageLayout";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/header/Header";
import { HeadContent, Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  notFoundComponent: () => {
    return (
      <BasePageLayout name="Error 404. Page not found">
        <div className="flex flex-col h-full justify-center">
          The requested URL was not found on this server.
        </div>
      </BasePageLayout>
    );
  },
  component: () => (
    <>
      <HeadContent />
      <div className="min-h-screen flex flex-col justify-between">
        <Header />
        <main className="min-h-full">
          <Outlet />
        </main>
        <Footer />
      </div>
      {/* <TanstackDevtools
        config={{
          position: 'bottom-left',
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      /> */}
    </>
  ),
});
