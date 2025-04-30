import React from "react";
import { useForm, usePage, Link } from "@inertiajs/react";

export default function Registration() {
  // Получаем flash-сообщение (если есть) из page.props
  const { flash, tickets_event } = usePage().props;
  console.log("Tickets from server:", tickets_event);

  // Инициализируем форму с начальными значениями
  const { data, setData, post, processing, errors, reset } = useForm({
    groupName: "",
    participantsNumber: "",
    contactPerson: "",
    email: "",
    phone: "",
    comments: "",
    ticket_id: "",

  });

  // Обработчик отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("registration"), {
      onSuccess: () => {
        reset(); // Сбросить форму после успешной отправки
      },
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-8">
        {/* Заголовок */}
        <h2 className="text-center text-3xl font-semibold text-gray-800 mb-6">
          Registration for the Event
        </h2>

        {/* Вывод flash-сообщения об успехе */}
        {flash && flash.success && (
          <div className="bg-green-100 text-green-700 text-center py-2 px-4 mb-4 rounded-lg">
            {flash.success}
          </div>
        )}

        {/* Форма */}
        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label htmlFor="ticket_id" className="block text-gray-700 font-medium">
              Select Ticket
            </label>
            <select
              id="ticket_id"
              name="ticket_id"
              className="w-full border border-gray-300 rounded-lg py-2 px-3 mt-1 focus:ring focus:ring-blue-300"
              value={data.ticket_id}
              onChange={(e) => setData("ticket_id", e.target.value)}
              required
            >
              <option value="">Choose a ticket</option>
              {tickets_event && tickets_event.length > 0 ? (
                tickets_event.map((ticket) => (
                  <option key={ticket.id} value={ticket.id}>
                    {ticket.title} - ${ticket.price}
                  </option>
                ))
              ) : (
                <option disabled>No tickets available</option>
              )}
            </select>
          </div>



          {/* Group Name */}
          <div>
            <label htmlFor="groupName" className="block text-gray-700 font-medium">
              Group Name
            </label>
            <div className="relative mt-1">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <i className="fa fa-users"></i>
              </span>
              <input
                type="text"
                id="groupName"
                name="groupName"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
                placeholder="Enter group name"
                value={data.groupName}
                onChange={(e) => setData("groupName", e.target.value)}
                required
              />
            </div>
            {errors.groupName && <p className="text-red-500 text-sm mt-1">{errors.groupName}</p>}
          </div>

          {/* Number of Participants */}
          <div>
            <label htmlFor="participantsNumber" className="block text-gray-700 font-medium">
              Number of Participants
            </label>
            <div className="relative mt-1">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <i className="fa fa-user-plus"></i>
              </span>
              <input
                type="number"
                id="participantsNumber"
                name="participantsNumber"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
                placeholder="Enter number of participants"
                value={data.participantsNumber}
                onChange={(e) => setData("participantsNumber", e.target.value)}
                max="11"
                required
              />
            </div>
            {errors.participantsNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.participantsNumber}</p>
            )}
          </div>

          {/* Contact Person */}
          <div>
            <label htmlFor="contactPerson" className="block text-gray-700 font-medium">
              Contact Person
            </label>
            <div className="relative mt-1">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <i className="fa fa-user"></i>
              </span>
              <input
                type="text"
                id="contactPerson"
                name="contactPerson"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
                placeholder="Enter contact person"
                value={data.contactPerson}
                onChange={(e) => setData("contactPerson", e.target.value)}
                required
              />
            </div>
            {errors.contactPerson && <p className="text-red-500 text-sm mt-1">{errors.contactPerson}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email
            </label>
            <div className="relative mt-1">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <i className="fa fa-envelope"></i>
              </span>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
                placeholder="Enter email"
                value={data.email}
                onChange={(e) => setData("email", e.target.value)}
                required
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-gray-700 font-medium">
              Phone
            </label>
            <div className="relative mt-1">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <i className="fa fa-phone"></i>
              </span>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
                placeholder="Enter phone number"
                value={data.phone}
                onChange={(e) => setData("phone", e.target.value)}
                required
              />
            </div>
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          {/* Comments */}
          <div>
            <label htmlFor="comments" className="block text-gray-700 font-medium">
              Comments
            </label>
            <textarea
              id="comments"
              name="comments"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
              placeholder="Enter comments (optional)"
              rows="4"
              value={data.comments}
              onChange={(e) => setData("comments", e.target.value)}
            ></textarea>
            {errors.comments && <p className="text-red-500 text-sm mt-1">{errors.comments}</p>}
          </div>

          {/* Кнопка отправки */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
            disabled={processing}
          >
            <i className="fa fa-paper-plane mr-2"></i> Submit
          </button>
        </form>

        {/* Ссылка для возврата */}
        <div className="mt-4 text-center">
          <Link href="/" className="text-blue-600 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
