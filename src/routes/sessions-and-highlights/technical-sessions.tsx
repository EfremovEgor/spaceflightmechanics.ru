import DownloadLink from "@/components/common/DownloadLink";
import BasePageLayout from "@/components/layout/BasePageLayout";
import ToBeDiscussed from "@/components/layout/ToBeDiscussed";
import { Routes } from "@/lib/routes";
import { TechnicalSessions } from "@/lib/sessions";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/sessions-and-highlights/technical-sessions",
)({
  component: RouteComponent,
  head: () => ({
    meta: Routes.sessions_and_highlights.routes!.technical_sessions.meta,
  }),
});

function RouteComponent() {
  return (
    <BasePageLayout name="Technical Sessions">
      {/* <DownloadLink
        path="/files/Technical Sessions – Presentation List.pdf"
        text="Technical Sessions – Presentation List"
      /> */}
      {/* <table className="sessions-table-full hidden md:table">
        <tbody>
          {Array.from({ length: 5 }, (_, i) => i * 2).map(
            (
              i, // строка
            ) => (
              <tr key={TechnicalSessions[i].name}>
                {Array.from({ length: 2 }, (_, j) => i + j).map(
                  (
                    k, // столбец
                  ) => (
                    <td>
                      {TechnicalSessions[k] && (
                        <div className="flex flex-col gap-4">
                          <h2 className="font-bold uppercase">
                            {TechnicalSessions[k].name}
                          </h2>
                          <div>
                            <strong>Session Chair:</strong>
                            <p className="line-clamp-2 h-[2.8em] ">
                              {TechnicalSessions[k].chair}
                            </p>
                          </div>
                          <p>{TechnicalSessions[k].description}</p>
                        </div>
                      )}
                    </td>
                  ),
                )}
              </tr>
            ),
          )}

          {/* <td>
                {TechnicalSessions[i + 1] && (
                  <div className="flex flex-col gap-4">
                    <h2 className="font-bold uppercase">
                      {TechnicalSessions[i + 1].name}
                    </h2>
                    <div>
                      <strong>Session Chair:</strong>
                      <p className="line-clamp-2 h-[2.8em] ">
                        {TechnicalSessions[i + 1].chair}
                      </p>
                    </div>
                    <p>{TechnicalSessions[i + 1].description}</p>
                  </div>
                )}
              </td> */}
      {/* <tr>
							<td>
								<div>
									<h2 className="font-bold uppercase">
										{TechnicalSessions[0].name}
									</h2>
									<div className="mt-4 flex flex-col gap-4">
										<strong>Session Chair:</strong> <br />
										<p className="line-clamp-2 h-[2.8em] ">
											{TechnicalSessions[0].chair}
										</p>
										<p>{TechnicalSessions[0].description}</p>
									</div>
								</div>
							</td>
							<td>
								<div>
									<h2 className="font-bold uppercase">
										{TechnicalSessions[1].name}
									</h2>
									<div className="mt-4 flex flex-col gap-4">
										<strong>Session Chair:</strong> <br />
										<p className="line-clamp-2 h-[2.8em]">
											{TechnicalSessions[1].chair}
										</p>
										<p>{TechnicalSessions[1].description}</p>
									</div>
								</div>
							</td>
						</tr>
						<tr>
							<td>
								<div>
									<h2 className="font-bold uppercase">
										{TechnicalSessions[2].name}
									</h2>
									<div className="mt-4 flex flex-col gap-4">
										<strong>Session Chair:</strong> <br />
										<p className="line-clamp-2 h-[2.8em]">
											{TechnicalSessions[2].chair}
										</p>
										<p>{TechnicalSessions[2].description}</p>
									</div>
								</div>
							</td>
							<td>
								<div>
									<h2 className="font-bold uppercase">
										{TechnicalSessions[3].name}
									</h2>
									<div className="mt-4 flex flex-col gap-4">
										<strong>Session Chair:</strong> <br />
										<p className="line-clamp-2 h-[2.8em] ">
											{TechnicalSessions[3].chair}
										</p>
										<p>{TechnicalSessions[3].description}</p>
									</div>
								</div>
							</td>
						</tr>
						<tr>
							<td>
								<div>
									<h2 className="font-bold uppercase">
										{TechnicalSessions[4].name}
									</h2>
									<div className="mt-4 flex flex-col gap-4">
										<strong>Session Chair:</strong> <br />
										<p className="line-clamp-2 h-[2.8em]">
											{TechnicalSessions[4].chair}
										</p>
										<p>{TechnicalSessions[4].description}</p>
									</div>
								</div>
							</td>
							<td>
								<div>
									<h2 className="font-bold uppercase">
										{TechnicalSessions[5].name}
									</h2>
									<div className="mt-4 flex flex-col gap-4">
										<strong>Session Chair:</strong> <br />
										<p className="line-clamp-2 h-[2.8em]">
											{TechnicalSessions[5].chair}
										</p>
										<p>{TechnicalSessions[5].description}</p>
									</div>
								</div>
							</td>
						</tr>
						<tr>
							<td>
								<div>
									<h2 className="font-bold uppercase">
										{TechnicalSessions[6].name}
									</h2>
									<div className="mt-4 flex flex-col gap-4">
										<strong>Session Chair:</strong> <br />
										<p className="line-clamp-2 h-[2.8em]">
											{TechnicalSessions[6].chair}
										</p>
										<p>{TechnicalSessions[6].description}</p>
									</div>
								</div>
							</td>
							<td>
								<div>
									<h2 className="font-bold uppercase">
										{TechnicalSessions[7].name}
									</h2>
									<div className="mt-4 flex flex-col gap-4">
										<strong>Session Chair:</strong> <br />
										<p className="line-clamp-2 h-[2.8em]">
											{TechnicalSessions[7].chair}
										</p>
										<p>{TechnicalSessions[7].description}</p>
									</div>
								</div>
							</td>
						</tr>
						<tr>
							<td>
								<div>
									<h2 className="font-bold uppercase">
										{TechnicalSessions[8].name}
									</h2>
									<div className="mt-4 flex flex-col gap-4">
										<strong>Session Chair:</strong> <br />
										<p className="line-clamp-2 h-[2.8em]">
											{TechnicalSessions[8].chair}
										</p>
										<p>{TechnicalSessions[8].description}</p>
									</div>
								</div>
							</td>
							<td></td>
						</tr> */}
      {/* </tbody>
      </table>  */}

      {/* <div className="flex flex-col gap-4 md:hidden">
        {TechnicalSessions.map((s) => (
          <>
            <div>
              <h2 className="font-bold uppercase">{s.name}</h2>
              <div className="mt-2">
                <strong>Session Chair:</strong> <br />
                {s.chair}
                <p className="text-justify mt-2">{s.description}</p>
              </div>
            </div>
            <hr />
          </>
        ))}
      </div> */}
      <ToBeDiscussed />
    </BasePageLayout>
  );
}
