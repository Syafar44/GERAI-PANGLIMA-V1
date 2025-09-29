import PageHead from "@/components/common/PageHead";
import Image from "next/image";
import Link from "next/link";
import { ReactNode} from "react";
import { signOut } from "next-auth/react";
import { cn } from "@/utils/cn";
import { useRouter } from "next/router";

interface PropTypes {
  children: ReactNode;
  description?: string;
  title?: string;
  type?: string;
}

const AdminLayout = (props: PropTypes) => {
  const { children, title} = props;
  const router = useRouter()

  return (
    <>
      <PageHead title={title} />
      <div className="flex">
          <div className="border-r w-[300px] h-screen flex flex-col items-center justify-between p-5">
            <div className="w-full">
              <Image src="/image/icon/logo.png" alt="logo" width={200} height={100} />
              <div className="rounded-box w-full grid gap-5 mt-10">
                <Link href={"/admin/produk"} className={cn("border border-gray-300 py-5 rounded shadow-lg px-5 font-bold text-lg hover:bg-primary hover:text-white transition ease-in-out duration-300 hover:cursor-pointer", {"bg-primary text-white" : router.pathname.startsWith("/admin/produk")})}>Produk</Link>
                <Link href={"/admin/banner"} className={cn("border border-gray-300 py-5 rounded shadow-lg px-5 font-bold text-lg hover:bg-primary hover:text-white transition ease-in-out duration-300 hover:cursor-pointer", {"bg-primary text-white" : router.pathname.startsWith("/admin/banner")})}>Banner</Link>
                <Link href={"/admin/content"} className={cn("border border-gray-300 py-5 rounded shadow-lg px-5 font-bold text-lg hover:bg-primary hover:text-white transition ease-in-out duration-300 hover:cursor-pointer", {"bg-primary text-white" : router.pathname.startsWith("/admin/content")})}>Konten</Link>
                <Link href={"/admin/news"} className={cn("border border-gray-300 py-5 rounded shadow-lg px-5 font-bold text-lg hover:bg-primary hover:text-white transition ease-in-out duration-300 hover:cursor-pointer", {"bg-primary text-white" : router.pathname.startsWith("/admin/news")})}>Berita / Blog</Link>
              </div>
            </div>
            <button className="w-full text-start border border-gray-300 py-5 rounded shadow-lg px-5 font-bold text-lg hover:bg-primary hover:text-white transition ease-in-out duration-300 hover:cursor-pointer" onClick={() => signOut()}>Log Out</button>
          </div>
          <div className="p-10">
            {children}
          </div>
      </div>
    </>
  );
};

export default AdminLayout;
