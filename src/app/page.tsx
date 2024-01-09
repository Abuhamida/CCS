import Image from "next/image";
import mohamed from "@/images/mohamed.png";
import akram from "@/images/akram.png";
import abanoup from "@/images/abanoup.png";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";
import Link from "next/link";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col  justify-center py-24">
      <h1 className="text-[#00a0f3] text-3xl font-bold mb-5 text-center ">
        Computational Cognitive Science
      </h1>
      <h3 className="text-xl font-semibold mb-5 -mt-7 text-left mx-10 text-[#000066]">
        DR/ Sayed Hussein Haggag
      </h3>
      <div id="Objectives" className="mx-3 my-3 px-24">
        <h4 className="text-xl">Course objectives:-</h4>
        <ul className=" list-item list-disc mx-5 mt-2">
          <li className="mb-2 text-lg">
            Learn about theories, models and key topics in CCS
          </li>
          <li>
            Diving into mathematical and computational modeling to understand
            these topics
          </li>
        </ul>
      </div>
      <div className="mx-3 my-3 px-24">
        <h4 className="text-xl">What is CCS?</h4>
        <p className="w-3/4 pl-3 text-lg">
          <span className="text-[#00A0F3]">
            CCS involves computational models to simulate human cognition and
            behavior
          </span>
          , allowing us to
          <span className="text-[#00A0F3]">
            test theories and make predictions
          </span>
          &nbsp;about how people think and behave. Therefore, the advancements
          in CCS has greater reflection on improvements of AI .
        </p>
        <div className="mt-3">
          <h4 className="text-xl">Examples of CCS in action are:</h4>
          <ul className="w-11/12 list-item list-disc mx-5 mt-2">
            <li className="mb-2 text-lg">
              Development AI systems that can learn and adapt based on data and
              feedback (Reinforcement NN, ......).
            </li>
            <li className="mb-2 text-lg">
              create more efficient AI algorithms leading to advances in fields
              such as natural language processing, robotics and self-driving
              cars, and so on.
            </li>
          </ul>
        </div>
      </div>
      <div className="  px-24 bg-[#000066] py-20" >
        <h4 className="text-xl text-[#00a0f3] ">Why Study Computational Cognitive Science?</h4>
        <ul className="w-11/12 list-item list-disc mx-5 mt-2 text-[#fafbf4]">
          <li className="mb-3 text-lg">
            By studying this field, we can improve artificial intelligence by
            creating more sophisticated algorithms that better mimic human
            cognition. For example, natural language processing, which is used
            in virtual assistants like Siri and Alexa, relies heavily on
            computational cognitive science.
          </li>
          <li className="mb-3 text-lg">
            Additionally, computational cognitive science can help us develop
            more effective learning strategies by understanding how people
            process and retain information. For instance, researchers have used
            cognitive modeling to identify the most efficient ways to teach
            complex subjects like math and science.
          </li>
          <li className="mb-3 text-lg">
            Furthermore, studying CCS can give a deeper understanding of human
            cognition. By using computer models to simulate cognitive processes,
            we can gain insights into how the brain works and why people think
            and behave the way they do. This knowledge can be applied to a wide
            range of fields, from psychology to education to marketing
          </li>
        </ul>
      </div>
      <div className="mx-3 my-3 px-24">
        <h4 className="text-xl ">
          Applications of Computational Cognitive Science
        </h4>
        <ul className="w-11/12 list-item list-disc mx-5 mt-2">
          <li className="mb-3 text-lg">
            <span className="text-[#00A0F3]">Natural language processing (NLP)</span>, which involves
            teaching computers to understand human language. NLP is used in a
            variety of real-world, such as chatbots that can answer customer
            service inquiries or virtual assistants like Siri and Alexa that can
            perform tasks based on voice commands.
          </li>
          <li className="mb-3 text-lg">
            <span className="text-[#00A0F3]">
              Machine learning, which involves training machines to learn from
              data
            </span>
            and make predictions based on that data. This technology is used in
            a wide range of fields, from finance to healthcare, to identify
            patterns and make decisions. For example, machine learning
            algorithms can be used to predict which patients are at risk for
            certain diseases based on their medical history and other factors.
          </li>
          <li className="mb-3 text-lg">
            <span className="text-[#00A0F3]">
              Cognitive modeling is another important application of
              computational cognitive science
            </span>
            , which involves creating computer models of human cognition. These
            models can help researchers better understand how the mind works and
            develop new theories about human behavior. For example, cognitive
            models have been used to study decision-making processes and develop
            more effective learning strategies.
          </li>
        </ul>
      </div>
      <div
        id="team"
        className="flex flex-col w-full py-10 bg-[#000066] text-center justify-center gap-5 my-3"
      >
        <h1 className="text-4xl text-[#fafbf4] font-bold ">
          our <span className="text-[#0000FF]">Team</span>
        </h1>
        <div className=" flex flex-wrap items-center justify-center gap-10 ">
          <div className="card max-w-72 lg:max-w-96 p-5 bg-[#151983] shadow-xl flex flex-col items-center justify-center">
            <Image
              src={akram}
              className="w-56 h-56 border-8 border-solid rounded-full "
              alt=""
            ></Image>
            <div>
              <h1 className="text-2xl text-[#0000FF] font-bold m-5 ">
                Ahmed Akram
              </h1>
              <div className="flex">
                <h1 className="text-xl flex gap-2  text-[#fafbf4] font-bold m-5 ">
                  <span className="text-[#00A0F3]">ID:</span>4211031
                </h1>
                <h1 className="text-xl flex gap-2  text-[#fafbf4] font-bold m-5 ">
                  <span className="text-[#00A0F3]">group:</span>B3
                </h1>
              </div>
            </div>
            <div className="flex gap-2 lg:gap-5">
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
          <div className="card max-w-72 lg:max-w-96 p-5 bg-[#151983] shadow-xl flex flex-col items-center justify-center">
            <Image
              src={mohamed}
              className="w-56 h-56 border-8 border-solid rounded-full "
              alt=""
            ></Image>
            <div>
              <h1 className="text-2xl text-[#0000FF] font-bold m-5 ">
                Mohamed Ramadan
              </h1>
              <div className="flex">
                <h1 className="text-xl flex gap-2  text-[#fafbf4] font-bold m-5 ">
                  <span className="text-[#00A0F3]">ID:</span>4211063
                </h1>
                <h1 className="text-xl flex gap-2  text-[#fafbf4] font-bold m-5 ">
                  <span className="text-[#00A0F3]">group:</span>A4
                </h1>
              </div>
            </div>
            <div className="flex gap-2 lg:gap-5">
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
          <div className="card max-w-72 lg:max-w-96 p-5 bg-[#151983] shadow-xl flex flex-col items-center justify-center">
            <Image
              src={abanoup}
              className="w-56 h-56 border-8 border-solid rounded-full "
              alt=""
            ></Image>
            <div>
              <h1 className="text-2xl text-[#0000FF] font-bold m-5 ">
                Abanoub Emad
              </h1>
              <div className="flex">
                <h1 className="text-xl flex gap-2  text-[#fafbf4] font-bold m-5 ">
                  <span className="text-[#00A0F3]">ID:</span>4211062
                </h1>
                <h1 className="text-xl flex gap-2  text-[#fafbf4] font-bold m-5 ">
                  <span className="text-[#00A0F3]">group:</span>A4
                </h1>
              </div>
            </div>
            <div className="flex gap-2 lg:gap-5">
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
