import PageHead from "@/components/common/PageHead";
import Image from "next/image";
import Link from "next/link";
import { ReactNode} from "react";
import { signOut } from "next-auth/react";

interface PropTypes {
  children: ReactNode;
  description?: string;
  title?: string;
  type?: string;
}

const AdminLayout = (props: PropTypes) => {
  const { children, title} = props;

  return (
    <>
      <PageHead title={title} />
      <div className="flex">
          <div className="border-r w-[300px] h-screen flex flex-col items-center justify-between p-5">
            <div className="w-full">
              <Image src="/image/icon/logo.png" alt="logo" width={200} height={100} />
              <div className="rounded-box w-full grid gap-5 mt-10">
                <Link href={"/admin/produk"} className="border border-gray-300 py-5 rounded shadow-lg px-5 font-bold text-lg hover:bg-primary hover:text-white transition ease-in-out duration-300 hover:cursor-pointer">Produk</Link>
                <Link href={"/admin/banner"} className="border border-gray-300 py-5 rounded shadow-lg px-5 font-bold text-lg hover:bg-primary hover:text-white transition ease-in-out duration-300 hover:cursor-pointer">Banner</Link>
                <Link href={"/admin/content"} className="border border-gray-300 py-5 rounded shadow-lg px-5 font-bold text-lg hover:bg-primary hover:text-white transition ease-in-out duration-300 hover:cursor-pointer">Konten</Link>
                <Link href={"/admin/news"} className="border border-gray-300 py-5 rounded shadow-lg px-5 font-bold text-lg hover:bg-primary hover:text-white transition ease-in-out duration-300 hover:cursor-pointer">Berita / Blog</Link>
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
