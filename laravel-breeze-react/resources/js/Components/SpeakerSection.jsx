import React from 'react';
import { SocialIcon } from 'react-social-icons';

const SpeakerSection = ({ speakers_event }) => {
    return (
        <>
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center">
                    <div className="w-full text-center">
                        <div className="mb-6">
                            <h2 className="text-3xl font-bold">Who’s speaking</h2>
                            <p className="text-gray-600">These are our communicators, you can see each person's information</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
                    {speakers_event.map((speaker, index) => (
                        <div 
                            key={index} 
                            className="relative w-64 h-80 rounded-xl overflow-hidden shadow-lg bg-cover bg-center group transition-transform duration-300 hover:scale-105 " 
                            style={{ backgroundImage: `url("/img/speakers/${speaker.image}")` }} 
                        >
                            {/* Social Icons (Hidden & Slide In) */}
                            <div className="absolute top-2 right-2 flex flex-col items-center gap-2 bg-gradient-to-b from-gray-900/80 to-gray-900/30 p-2 rounded-lg 
                                            opacity-0 translate-x-4 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:translate-x-0">
                                {speaker.facebook && <SocialIcon url={speaker.facebook} className="!w-8 !h-8" />}
                                {speaker.instagram && <SocialIcon url={speaker.instagram} className="!w-8 !h-8" />}
                                {speaker.twitter && <SocialIcon url={speaker.twitter} className="!w-8 !h-8" />}
                                {speaker.linkedin && <SocialIcon url={speaker.linkedin} className="!w-8 !h-8" />}
                            </div>

                            {/* Speaker Info */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900/90 to-transparent p-4 text-white opacity-0 translate-y-4 translation-all duration-500 ease-in-out group-hover:opacity-100 group-hover:translate-y-0">
                                <h5 className="text-lg font-semibold">{speaker.name}</h5>
                                <span className="text-sm opacity-75">{speaker.title}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default SpeakerSection;
