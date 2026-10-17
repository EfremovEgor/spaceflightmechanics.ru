import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/header/Header";
import { HeadContent, Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
	component: () => (
		<>
			<HeadContent />
			<div className="min-h-screen flex flex-col justify-between">
				{/* Archive notice: this site is kept as it was for the 2025 forum. */}
				<div className="bg-text-primary text-white text-sm">
					<div className="max-w-[980px] px-4 mx-auto py-2 flex flex-wrap gap-x-4 gap-y-1 justify-between">
						<span>Archive: 6th SciTech Forum, December 2-4, 2025</span>
						<a className="underline hover:no-underline" href="/">
							7th SciTech Forum, November 24-26, 2026 →
						</a>
					</div>
				</div>
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
