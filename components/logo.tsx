import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/">
      <Image
        src="/images/logo.png"
        alt="Medico Store Logo"
        height={46}
        width={156}
        quality={75}
      />
    </Link>
  );
};
