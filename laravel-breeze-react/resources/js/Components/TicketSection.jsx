import { CheckIcon } from '@heroicons/react/20/solid'

const TicketPricing = ({ tickets_event }) => {
  return (
    <div 
      className="relative isolate w-full min-h-screen flex flex-col items-center justify-center px-6 py-24 sm:py-32 lg:px-8"
      style={{
        backgroundImage: "url('/img/business_conference.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-base font-semibold text-indigo-600">Pricing</h2>
        <p className="mt-2 text-5xl font-semibold tracking-tight text-indigo-900 sm:text-6xl">
          Choose Your Ticket
        </p>
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-gray-600 sm:text-xl">
        Select the best ticket option that suits your needs and enjoy the event.
      </p>
      <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-y-6 sm:mt-20 lg:max-w-4xl lg:grid-cols-3 lg:gap-12">
        {tickets_event.map((ticket) => (
          <div
            key={ticket.id}
            className="rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10 bg-white shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
          >
            <h3 className="text-indigo-600 text-base font-semibold">{ticket.title}</h3>
            <p className="mt-4 flex items-baseline gap-x-2">
              <span className="text-gray-900 text-5xl font-semibold tracking-tight">${ticket.price}</span>
            </p>
            <ul className="mt-8 space-y-3 text-sm text-gray-600">
              {ticket.features.map((feature, index) => (
                <li key={index} className="flex gap-x-3">
                  <CheckIcon className="text-indigo-600 h-6 w-5 flex-none" />
                  {feature}
                </li>
              ))}
            </ul>
            <a
              href="/registration"
              className="mt-8 block rounded-md bg-indigo-500 text-white px-3.5 py-2.5 text-center text-sm font-semibold shadow-sm hover:bg-indigo-400"
            >
              Get Ticket
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketPricing;


