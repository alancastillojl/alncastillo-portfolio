import { InquiriesButton } from "./InquiriesButton";
import { SocialIcons } from "./SocialIcons";

export function Footer() {
  return (
    <footer className="border-t border-foreground/10 px-6 py-20 text-center md:px-10">
      <h2 className="text-[14px] font-normal tracking-tight uppercase md:text-[19px]">
        Get in Touch
      </h2>

      <div className="mt-8 flex justify-center">
        <SocialIcons />
      </div>

      <InquiriesButton size="md" className="mt-10" />
    </footer>
  );
}
