import { Button } from "./Button";
import { cn } from "../utils";

import React, { forwardRef, ForwardedRef, HTMLAttributes } from "react";

const Tags = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex gap-2 py-2 flex-wrap", className)}
      {...props}
    />
  )
);

const Title = forwardRef<HTMLDivElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        "text-lg text-primary font-semibold leading-none tracking-tight my-2",
        className
      )}
      {...props}
    />
  )
);

const Description = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p className={cn("text-xs", className)} ref={ref} {...props} />
));

interface ImageProps extends HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  href: string;
  buttonText: string;
}

const Image = forwardRef<HTMLDivElement, ImageProps>(
  ({ src, alt, href, className, buttonText = "Website", ...props }, ref) => {
    const [demo, setDemo] = React.useState(false);

    const onHoverHandler = () => {
      setDemo(true);
    };

    const onLeaveHandler = () => {
      setDemo(false);
    };

    return (
      <div
        className={cn(
          "relative rounded-md transition-all overflow-hidden duration-200 hover:-translate-y-2 select-none ",
          className
        )}
        onMouseOver={onHoverHandler}
        onMouseLeave={onLeaveHandler}
        ref={ref}
        {...props}
      >
        <img
          src={src}
          alt={alt}
          className="shadow hover:shadow-lg select-none"
        />
        {demo && (
          <a
            href={href}
            className="absolute bottom-3 transition-all duration-100 right-1"
          >
            <Button variant={"default"}>{buttonText}</Button>
          </a>
        )}
      </div>
    );
  }
);

interface ArticleCardProps extends HTMLAttributes<HTMLDivElement> {}

interface ArticleCardType
  extends React.ForwardRefExoticComponent<
    ArticleCardProps & React.RefAttributes<HTMLDivElement>
  > {
  Tags: typeof Tags;
  Title: typeof Title;
  Description: typeof Description;
  Image: typeof Image;
}

const ArticleCard = forwardRef<HTMLDivElement, ArticleCardProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("text-card-foreground w-full overflow-hidden", className)}
      {...props}
    >
      {children}
    </div>
  )
) as ArticleCardType;

ArticleCard.Tags = Tags;
ArticleCard.Title = Title;
ArticleCard.Description = Description;
ArticleCard.Image = Image;

export default ArticleCard;
