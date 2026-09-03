import Image from "next/image";

type CookbookLogoProps = {
  variant?: "header" | "footer";
  className?: string;
};

export default function CookbookLogo({
  variant = "header",
  className = "",
}: CookbookLogoProps) {
  if (variant === "footer") {
    return (
      <div
        className={`relative h-[72px] w-[200px] shrink-0 ${className}`}
        aria-label="Aero Publishing"
      >
        <Image
          src="/cookbook/lp/logo-footer.png"
          alt=""
          width={150}
          height={50}
          className="h-auto w-full"
        />
      </div>
    );
  }

  return (
    <Image
      src="/cookbook/lp/logo-header.webp"
      alt="Aero Publishing"
      width={127}
      height={68}
      priority
      className={`h-[40px] w-auto sm:h-[42px] ${className}`}
    />
  );
}
