import { Icon } from "@iconify/react";
import { createLink, type LinkComponent } from "@tanstack/react-router";
import { useT } from "@/lib/lang";
import { forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ComponentProps, type ReactNode } from "react";

type Variant = "primary" | "ghost";

interface Common {
	variant?: Variant;
	/** Trailing icon; primary actions get an arrow unless set to null. */
	icon?: string | null;
	children: ReactNode;
}

const classes = (variant: Variant, extra = "") =>
	`btn ${variant === "primary" ? "btn-primary" : "btn-ghost"} ${extra}`.trim();

const Inner = ({ variant, icon, children }: Common) => {
	const name = icon === undefined ? (variant === "primary" ? "mdi:arrow-right" : null) : icon;
	return (
		<>
			{children}
			{name && (
				<Icon
					icon={name}
					aria-hidden
					className="size-4 shrink-0 transition-transform duration-300 group-hover/btn:translate-x-0.5"
				/>
			)}
		</>
	);
};

/** The one button style used for every action on the site. */
export const Button = forwardRef<HTMLButtonElement, Common & ButtonHTMLAttributes<HTMLButtonElement>>(
	({ variant = "primary", icon, children, className, type = "button", ...rest }, ref) => (
		<button ref={ref} type={type} className={classes(variant, `group/btn ${className ?? ""}`)} {...rest}>
			<Inner variant={variant} icon={icon}>
				{children}
			</Inner>
		</button>
	),
);
Button.displayName = "Button";

/** Same look for external links. */
export const ButtonAnchor = forwardRef<HTMLAnchorElement, Common & AnchorHTMLAttributes<HTMLAnchorElement>>(
	({ variant = "primary", icon, children, className, ...rest }, ref) => (
		<a ref={ref} className={classes(variant, `group/btn ${className ?? ""}`)} {...rest}>
			<Inner variant={variant} icon={icon}>
				{children}
			</Inner>
		</a>
	),
);
ButtonAnchor.displayName = "ButtonAnchor";

const AnchorForLink = forwardRef<HTMLAnchorElement, Common & AnchorHTMLAttributes<HTMLAnchorElement>>(
	(props, ref) => <ButtonAnchor ref={ref} {...props} />,
);
AnchorForLink.displayName = "AnchorForLink";

const CreatedLink = createLink(AnchorForLink);

/** Same look for in-app navigation. */
export const ButtonLink: LinkComponent<typeof AnchorForLink> = (props) => {
	const { lp } = useT();
	const to = typeof props.to === "string" ? lp(props.to) : props.to;
	const linkProps = { preload: "intent", ...props, to } as ComponentProps<typeof CreatedLink>;
	return <CreatedLink {...linkProps} />;
};
