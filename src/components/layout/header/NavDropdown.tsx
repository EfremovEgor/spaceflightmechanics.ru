import { Routes } from "@/lib/routes";
import { Icon } from "@iconify/react";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Container from "@/components/layout/Container";

const NavDropdown = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  let timeoutId: ReturnType<typeof setTimeout>;

  const handleClick = () => {
    clearTimeout(timeoutId);
    setOpen(true);
  };

  const handleClose = () => {
    timeoutId = setTimeout(() => setOpen(false), 150);
  };

  return (
    <div className="md:hidden">
      <div>
        <Container className="text-lg py-6">
          <button
            onClick={handleClick}
            type="button"
            className="cursor-pointer text-white/50 hover:text-white inline-flex items-center transition-colors"
          >
            <Icon
              icon="material-symbols:menu"
              className="text-white text-4xl"
            />
          </button>
        </Container>
        <div
          className={`fixed left-1/2 top-0 -translate-x-1/2 shadow bg-primary
                    w-full transition-all duration-200 origin-top h-full z-20
                    ${
                      open
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-95 pointer-events-none"
                    }`}
        >
          <Container className="py-2">
            <div className="flex flex-row justify-end">
              <button
                onClick={handleClose}
                className="text-4xl text-white cursor-pointer"
              >
                <Icon icon="material-symbols:close" />
              </button>
            </div>
            <div className="flex flex-col gap-2 text-xl">
              {Object.values(Routes).map((r) => {
                if (r.hidden || !r.showInNav) return;
                if (r.routes)
                  return (
                    <div key={"dropdown" + r.name}>
                      <span className="text-white font-bold">
                        {t(`routes.${r.name}`)}
                      </span>
                      <div className="flex flex-col ml-4">
                        {Object.values(r.routes).map((s) =>
                          s.disabled ? (
                            <p className="text-gray-300">
                              {t(`routes.${s.name}`)}
                            </p>
                          ) : (
                            <Link
                              onClick={handleClose}
                              to={`${r.path}/${s.path}` as string}
                              key={s.name}
                              className="text-white [&.active]:underline"
                            >
                              {t(`routes.${s.name}`)}
                            </Link>
                          ),
                        )}
                      </div>
                    </div>
                  );
                return r.disabled ? (
                  <p className="text-gray-400">{t(`routes.${r.name}`)}</p>
                ) : (
                  <Link
                    onClick={handleClose}
                    to={r.path}
                    key={r.name}
                    className="text-white  [&.active]:underline"
                  >
                    {t(`routes.${r.name}`)}
                  </Link>
                );
              })}
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default NavDropdown;
