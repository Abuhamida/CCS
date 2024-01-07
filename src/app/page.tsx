import Image from "next/image";
import mohamed from "@/images/mohamed.png";
import akram from '@/images/akram.png'
import abanoup from '@/images/abanoup.png'
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";
import Link from "next/link";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center py-24">
      <div id="Objectives"></div>
      <div
        id="team"
        className="flex flex-col min-w-full py-10 bg-[#000066] text-center justify-center gap-5 "
      >
        <h1 className="text-4xl text-[#fafbf4] font-bold ">
          our <span className="text-[#0000FF]">Team</span>
        </h1>
        <div className=" flex flex-row items-center justify-center gap-10 ">
          <div className="card w-96 p-5 bg-[#151983] shadow-xl flex flex-col items-center justify-center">
            <Image
              src={akram}
              className="w-56 h-56 border-8 border-solid rounded-full "
              alt=""
            ></Image>
            <div>
              <h1 className="text-2xl text-[#0000FF] font-bold m-5 ">
                Ahmed Akram 
              </h1>
              <h1 className="text-xl text-[#fafbf4] font-bold m-5 ">
                <span className="text-[#00A0F3]">ID:</span>4211031
                &nbsp;&nbsp;&nbsp;&nbsp;{" "}
                <span className="text-[#00A0F3]">group: </span>B4
              </h1>
            </div>
            <div className="flex gap-5">
              <Link href="https://www.fLinkcebook.com/mohamed.ramadan.16547/">
                <FaFacebookF className="text-[#fafbf4] text-3xl m-5"></FaFacebookF>
              </Link>
              <Link href="https://www.instagram.com/mohamedramadan_97/">
                <FaInstagram className="text-[#fafbf4] text-3xl m-5"></FaInstagram>
              </Link>
              <Link href="https://www.linkedin.com/in/mohamed-ramadan-0b3a0b1b3/">
                <FaLinkedinIn className="text-[#fafbf4] text-3xl m-5"></FaLinkedinIn>
              </Link>
              <Link href="">
                {" "}
                <FaGithub className="text-[#fafbf4] text-3xl m-5"></FaGithub>
              </Link>
            </div>
          </div>
          <div className="card w-96 p-5 bg-[#151983] shadow-xl flex flex-col items-center justify-center">
            <Image
              src={mohamed}
              className="w-56 h-56 border-8 border-solid rounded-full "
              alt=""
            ></Image>
            <div>
              <h1 className="text-2xl text-[#0000FF] font-bold m-5 ">
                Mohamed Ramadan
              </h1>
              <h1 className="text-xl text-[#fafbf4] font-bold m-5 ">
                <span className="text-[#00A0F3]">ID:</span>4211063
                &nbsp;&nbsp;&nbsp;&nbsp;{" "}
                <span className="text-[#00A0F3]">group: </span>A4
              </h1>
            </div>
            <div className="flex gap-5">
              <Link href="https://www.fLinkcebook.com/mohamed.ramadan.16547/">
                <FaFacebookF className="text-[#fafbf4] text-3xl m-5"></FaFacebookF>
              </Link>
              <Link href="https://www.instagram.com/mohamedramadan_97/">
                <FaInstagram className="text-[#fafbf4] text-3xl m-5"></FaInstagram>
              </Link>
              <Link href="https://www.linkedin.com/in/mohamed-ramadan-0b3a0b1b3/">
                <FaLinkedinIn className="text-[#fafbf4] text-3xl m-5"></FaLinkedinIn>
              </Link>
              <Link href="">
                {" "}
                <FaGithub className="text-[#fafbf4] text-3xl m-5"></FaGithub>
              </Link>
            </div>
          </div>
          <div className="card w-96 p-5 bg-[#151983] shadow-xl flex flex-col items-center justify-center">
            <Image
              src={abanoup}
              className="w-56 h-56 border-8 border-solid rounded-full "
              alt=""
            ></Image>
            <div>
              <h1 className="text-2xl text-[#0000FF] font-bold m-5 ">
                Abanoub Emad
              </h1>
              <h1 className="text-xl text-[#fafbf4] font-bold m-5 ">
                <span className="text-[#00A0F3]">ID:</span>4211062
                &nbsp;&nbsp;&nbsp;&nbsp;{" "}
                <span className="text-[#00A0F3]">group: </span>A4
              </h1>
            </div>
            <div className="flex gap-5">
              <Link href="https://www.fLinkcebook.com/mohamed.ramadan.16547/">
                <FaFacebookF className="text-[#fafbf4] text-3xl m-5"></FaFacebookF>
              </Link>
              <Link href="https://www.instagram.com/mohamedramadan_97/">
                <FaInstagram className="text-[#fafbf4] text-3xl m-5"></FaInstagram>
              </Link>
              <Link href="https://www.linkedin.com/in/mohamed-ramadan-0b3a0b1b3/">
                <FaLinkedinIn className="text-[#fafbf4] text-3xl m-5"></FaLinkedinIn>
              </Link>
              <Link href="">
                <FaGithub className="text-[#fafbf4] text-3xl m-5"></FaGithub>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
