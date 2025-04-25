import React from "react";
import FooterSponsors from "./FooterSponsors";


export default function LocationSection() {
  return (
    <section className="relative flex flex-col md:flex-row w-full h-[500px] md:h-[600px]">
      {/* Левая часть с текстом */}
      <div
        className="relative w-full md:w-1/2 flex items-center justify-center text-white px-8 md:px-16"
        style={{
          backgroundImage: "url('https://source.unsplash.com/1600x900/?conference')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div> {/* Затемнение */}
        <div className="relative z-10">
          <h2 className="text-4xl font-bold">Location</h2>
          <p className="mt-2 text-lg">Get directions to our event center</p>

          <div className="mt-4 space-y-2">
            <p>
              <strong>Address:</strong> Eestonia Jõhvi
            </p>
            <p>
              <strong>Phone:</strong> (+12)-345-67-8910
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <a href="mailto:info.vahe@gmail.com" className="text-blue-400 hover:underline">
                info.vahe@gmail.com
              </a>
            </p>
            <p>
              <strong>Website:</strong>{" "}
              <a href="https://conference.colorlib.com" className="text-blue-400 hover:underline">
                https://conference.vahe.com
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Правая часть с Google Maps */}
      <div className="w-full md:w-1/2">
        <iframe
          title="Google Maps"
          className="w-full h-full"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2033.3671264358088!2d27.3980508!3d59.36021149999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x469465160e5e67bd%3A0xb8ed670e5bf3cb7c!2sIda-Virumaa%20Kutsehariduskeskus%20J%C3%B5hvi%20%C3%B5ppekoht!5e0!3m2!1sru!2see!4v1745414401114!5m2!1sru!2see"
          allowFullScreen
          loading="lazy"
        ></iframe>
        
          </div>
   
       
    </section>




  );
}
