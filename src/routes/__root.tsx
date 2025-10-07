import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/header/Header";
import { HeadContent, Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
	component: () => (
		<>
			<HeadContent />
			<div className="min-h-screen flex flex-col justify-between">
				<Header />
				<main>
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
