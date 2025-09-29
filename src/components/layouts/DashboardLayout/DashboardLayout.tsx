"use client";

import { ReactNode, useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import { LIST_CONSTANTS } from "./DashboardLayout.constans";
import Image from "next/image";
import Link from "next/link";

import { HiOutlineMenu, HiX } from "react-icons/hi";
import { FaFacebookF, FaInstagram, FaPlus, FaTiktok } from "react-icons/fa6";

const orderClass: Record<number, string> = {
  1: "order-1",
  2: "order-2",
  4: "order-4",
  5: "order-5",
};

type PropTypes = {
  children?: ReactNode;
  isSubPage?: boolean;
};

const DashboardLayout = (props: PropTypes) => {
  const { children, isSubPage } = props;
  const [scrollSubPage, setScrollSubPage] = useState(false);

  useEffect(() => {
    if (isSubPage !== undefined) return;
    const handleScroll = () => {
      setScrollSubPage(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isSubPage]);

  const activeSubPage = isSubPage !== undefined ? isSubPage : scrollSubPage;

  return (
    <div>
      <nav
        className={cn(
          "px-20 py-2 w-full fixed top-0 left-0 z-50 transition-colors duration-300 hidden md:block",
          activeSubPage
            ? "shadow-md bg-white"
            : "bg-linear-to-b from-black to-transparent"
        )}
      >
        <ul className="flex justify-between items-center">
          <li className="order-3">
            <Link href={"/"}>
              <Image
                className={cn(
                  "w-[200px]",
                  activeSubPage ? "" : "grayscale brightness-0 invert"
                )}
                src="/image/icon/logo.png"
                alt="logo"
                width={1000}
                height={1000}
              />
            </Link>
          </li>
          {LIST_CONSTANTS.map((item) => (
            <li
              key={item.key}
              className={cn(
                "md:text-nowrap lg:text-xl xl:text-2xl font-bold py-6 px-5 hover:bg-secondary/10 hover:scale-105 hover:border-b-2 duration-200 transition ease-in-out",
                activeSubPage ? "text-primary" : "text-white",
                `${orderClass[item.order]}`
              )}
            >
              <Link href={item.href}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <nav className="w-full fixed top-0 left-0 z-50 bg-white md:hidden">
        <div className="flex items-center justify-between shadow-sm w-full p-2">
          <Link href={"/"} className="pl-2 w-[150px]">
            <Image
                src="/image/icon/logo.png"
                alt="logo"
                width={1000}
                height={1000}
              />
          </Link>
          <div className="drawer drawer-end w-10">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              <label htmlFor="my-drawer-4" className="drawer-button text-primary"><HiOutlineMenu size={30} /></label>
            </div>
            <div className="drawer-side">
              <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
              <div className="list bg-secondary text-white min-h-full w-80 text-xl">
                <label htmlFor="my-drawer-4" className="px-4 py-3"><HiX size={35} /></label>
                <div className="join join-vertical">
                  <Link href={"/"} className="px-4 py-4 border-y">Beranda</Link>
                  <div className="collapse collapse-arrow join-item border-b">
                    <input type="radio" name="my-accordion-4" />
                    <Link href={"/menu-kami"} className="collapse-title">Menu Kami</Link>
                    <div className="collapse-content grid bg-secondary-dark">
                      <Link href={"/menu-kami/oleh-oleh"} className="px-4 py-4 border-b">Oleh - Oleh</Link>
                      <Link href={"/menu-kami/snack-box"} className="px-4 pt-4">Snack Box</Link>
                    </div>
                  </div>
                  <Link href={"/news"} className="px-4 py-4 border-b">Berita Terbaru</Link>
                  <div className="collapse collapse-arrow join-item border-b">
                    <input type="radio" name="my-accordion-4" />
                    <Link href={"/about"} className="collapse-title">Tentang Gerai Panglima</Link>
                    <div className="collapse-content grid bg-secondary-dark">
                      <Link href={"/location"} className="px-4 py-4 border-b">Lokasi</Link>
                      <Link href={"/contact"} className="px-4 pt-4">Kontak Kami</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="fab">
        <div tabIndex={0} role="button" className="btn btn-lg btn-circle bg-primary text-white"><FaPlus size={30} /></div>
        <div className="fab-close">
          <span className="btn btn-circle btn-lg bg-secondary border-primary text-primary rotate-45"><FaPlus size={30} /></span>
        </div>

        <Link href={"https://www.tiktok.com/@geraipanglimasamarinda"} target="_blank"> <button className="btn btn-lg btn-circle bg-primary text-white"><FaTiktok size={30} /></button></Link>
        <Link href={"https://www.facebook.com/oleholehkhaskaltim"} target="_blank"> <button className="btn btn-lg btn-circle bg-primary text-white"><FaFacebookF size={30} /></button></Link>
        <Link href={"https://www.instagram.com/geraipanglima/"} target="_blank"> <button className="btn btn-lg btn-circle bg-primary text-white"><FaInstagram size={30} /></button></Link>
      </div>
      {children}
      <footer>
        <div
          className="w-full h-[500px] md:h-[400px] bg-center bg-repeat"
          style={{ backgroundImage: "url('/image/background.jpg')" }}
        >
          <div className="px-10 sm:px-20 py-10 flex flex-col md:flex-row items-center md:justify-between">
            <nav className="grid gap-5">
              <Image
                className="w-[300px]"
                src="/image/icon/logo.png"
                alt="logo"
                width={1000}
                height={1000}
              /> 
              <ul className="text-white grid gap-3 text-xl md:grid-cols-2">
                <li>
                  <Link href={"/contact"}> ➤ Kontak Kami</Link>
                </li>
                <li>
                  <Link href={"/about"}> ➤ Tentang Gerai Panglima</Link>
                </li>
                <li>
                  <Link href={"/location"}> ➤ Lokasi kami</Link>
                </li>
                <li>
                  <Link href={"/news"}> ➤ Berita Terbaru</Link>
                </li>
                <li>
                  <Link href={"/delivery"}> ➤ Pemesanan</Link>
                </li>
              </ul>
            </nav>
            <div>

            </div>
          </div>
          <div className="border border-primary" />
          <div className="px-10 sm:px-20 py-5">
            <p className="text-center md:text-start">
              © 2025 Gerai Panglima by <Link className="underline text-gray-600" href="https://www.panglimaroqiiqugroup.com/" target="_blank">Panglima Roqiiqu Group</Link> | All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DashboardLayout;
