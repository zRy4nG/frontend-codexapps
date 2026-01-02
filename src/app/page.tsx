'use client'
import NavBar from "@/components/NavBar";
import Feedbacks from "@/components/Feedbacks";
import Faqs from "@/components/Faqs";
import Products from "@/components/Products";
import Header from "@/components/Header";
import Accordion from "@/components/Accordion";
import About from "@/components/About";
import Footer from "@/components/Footer";

import quadrilhos from "../../public/quadrilhos.svg"

export default function Home() {
  return (
    <>
      <main className="absolute h-full w-full bg-no-repeat bg-cover bg-center bg-[#07080C]" style={{ backgroundImage: `url(${quadrilhos.src})` }}>
        <NavBar />
        <Header />
        <Faqs />
        <Products />
        <Feedbacks />
        <Accordion />
        <About />
        <Footer />
      </main>
    </>
  );
}