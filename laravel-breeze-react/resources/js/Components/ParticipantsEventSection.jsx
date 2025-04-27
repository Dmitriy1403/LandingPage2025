import React, { useState,useEffect } from "react";
import { Table, Container, Button } from "react-bootstrap";
import { usePage, useForm } from '@inertiajs/react';
import { FaUsers, FaTicketAlt } from "react-icons/fa";
import { Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';

import { Search } from "lucide-react";  // optional icon

import axios from "axios";
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import Sidebar from "./Sidebar";
export default function ParticipantEvent({ participants_event, ticket_sum, totalParticipants,ticketSales,postLikeStats }) {
  // Инициализируем состояние списком участников из participants_event.data
  


  const allParticipants = participants_event.data || [];

  const [participants, setParticipants] = useState(participants_event.data || []);
  
 
  const [editRegisterId, setEditRegisterId] = useState(null);


  const [searchItem, setSearchItem] = useState('')

  const [filteredUsers, setFilteredUsers] = useState(allParticipants

  );

  useEffect(() => {
    const term = searchItem.toLowerCase();
    const filtered = allParticipants.filter(p =>
      p.groupName?.toLowerCase().includes(term) ||
      p.email?.toLowerCase().includes(term) ||
      p.contactPerson?.toLowerCase().includes(term) ||
      p.phone?.toLowerCase().includes(term)
    );
    setFilteredUsers(filtered);
  }, [searchItem, allParticipants]);


  const handleInputChange = (e) => { 
    const searchTerm = e.target.value;
    setSearchItem(searchTerm)

    const filteredItems = participants_event.filter((participant) =>
    participant.groupName||participant.email||participant.contactPerson||participant.phone.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredUsers(filteredItems);
  }




  const {
    data: editRegisterData,
    setData: setEditRegisterData,
    patch: updateRegistration,
    errors: RegistrationsEditErrors,
    reset: resetEditRegisterForm,
  } = useForm({
    groupName: '',
    ticket_id:'',
    participantsNumber: '',
    contactPerson:'',
    email:'',
    phone:'',
  });

  const handleEditRegistration = (registration)=>{
    setEditRegisterId(registration.id);
    setEditRegisterData({
      groupName:registration.groupName,
      ticket_id:registration.ticket_id,
      participantsNumber:registration.participantsNumber,
      contactPerson:registration.contactPerson,
      email:registration.email,
      phone: registration.phone,

    });

  };

  const submitEditResistration = (e)=>{
    e.preventDefault();
    updateRegistration(route('registration.update',editRegisterId),{
      onSuccess: () => {
        setEditRegisterId(null);
        resetEditRegisterForm();
      Inertia.reload();

        
      },
    }
  )
  }

  const cancelEditRegistration = () => {
    setEditRegisterId(null);
    resetEditRegisterForm();
  };


  console.log("ticketSales prop:", ticketSales);





  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this participant?")) return;
  
    try {
      await axios.delete(`/participants/${id}`);
      
      setParticipants((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting participant:", error);
      alert("Failed to delete participant. Try again.");
    }
  };
  
  return (
    <Container className="mt-8 ">
        <div className="grid grid-cols-11 sm:grid-cols-2 gap-6 mt-8">

       

      
      <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg flex justify-between items-center">
        <div>
          <h4 className="text-lg font-semibold">Total Participants</h4>
          <h2 className="text-3xl font-bold">{totalParticipants}</h2>
          <p className="text-sm mt-2">Statistics of all registered participants</p>
        </div>
        <FaUsers className="text-5xl opacity-80" />
      </div>

    
      <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg flex justify-between items-center">
        <div>
          <h4 className="text-lg font-semibold">Sales Amount</h4>
          <h2 className="text-3xl font-bold">${ticket_sum}</h2>
          <p className="text-sm mt-2">Total amount of tickets sold</p>
        </div>
        <FaTicketAlt className="text-5xl opacity-80" />
      </div>
    </div>
    <h2 className="text-2xl font-bold mb-4 mt-8 flex justify-center ">Ticket Sales Summary</h2>

    <div className="mt-8  flex justify-center">

      
        
        <Table striped bordered hover responsive className="shadow-lg">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Title</th>
              <th className="p-3">Registrations Count</th>
              <th className="p-3">Participants Sum</th>
              <th className="p-3">Sales Sum</th>
            </tr>
          </thead>
          <tbody>
          {ticketSales?.length > 0 ? (
  ticketSales?.map((ticket, index) => (
    <tr key={ticket.id}>
      <td className="p-3 text-center">{index + 1}</td>
      <td className="p-3">{ticket.title}</td>
      <td className="p-3 text-center">{ticket.registrations_count}</td>
      <td className="p-3 text-center">{ticket.participants_sum}</td>
      <td className="p-3 text-center">{ticket.sales_sum}</td>
    </tr>
  ))
) : (
  <tr>
    <td colSpan="5" className="text-center text-muted p-4">
      No ticket sales data found
    </td>
  </tr>
)}
          </tbody>
        </Table>
      </div>
      
      <div className="mt-8 bg-white shadow sm:rounded-lg p-6">

                <div className="bg-amber-600">
                <h2 className="text-lg font-bold mb-4">Post Likes Statistics</h2>
                </div>
                {postLikeStats.length > 0 ? (
                    <ul>
                        {postLikeStats.map(post => (
                            <li
                                key={post.id}
                                className="flex justify-between py-2 border-b last:border-none"
                            >
                                <span className="font-medium">{post.title}</span>
                                <span className="text-gray-600">{post.likers_count} likes</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">Пока нет лайков ни на одном посте.</p>
                )}
            </div>
      
      <h1 className="flex justify-center mt-8 mb-16 text-4xl font-extrabold leading-none tracking-tight text-black-900 md:text-5xl lg:text-6xl dark:text">
        Participants event
      </h1>

      <div className="container mx-auto flex items-center justify-center  mt-10 mb-10">
      <Search className="w-5 h-5 mr-2 text-gray-500" />
        <input
          type="text"
          value={searchItem}
          onChange={e => setSearchItem(e.target.value)}
          className="border rounded w-64 py-2 px-3"
          placeholder="Поиск по группе, email, контакту, телефону"
        />
 
</div>
      
      
           <div className="flex justify-center ">
           <Sidebar />
           <div className="table-responsive">
  <Table striped bordered hover responsive className="shadow-lg">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th className="p-3">#</th>
        <th className="p-3">Group Name</th>
        <th className="p-3">Participants Number</th>
        <th className="p-3">Contact Person</th>
        <th className="p-3">Email</th>
        <th className="p-3">Phone</th>
        <th className="p-3">Date</th>
        <th className="p-3">Ticket ID</th>
        <th className="p-3">Actions</th>
      </tr>
    </thead>
    <tbody>
      {filteredUsers?.length > 0 ? (
        filteredUsers.map((participant, index) => {
          // Проверяем, редактируем ли мы сейчас этого участника
          if (editRegisterId === participant.id) {
            // Редактируемая строка
            return (
              <tr key={participant.id}
                  className="border-b dark:border-gray-700 border-gray-200"
                  style={{ height: "50px" }}
              >
                <td className="p-3 text-center">{index + 1}</td>
                {/* groupName */}
                <td className="p-3">
                  <input
                    type="text"
                    className="form-control"
                    value={editRegisterData.groupName}
                    onChange={(e) => setEditRegisterData('groupName', e.target.value)}
                  />
                  {RegistrationsEditErrors?.groupName && (
                    <div className="text-red-500 text-sm">
                      {RegistrationsEditErrors.groupName}
                    </div>
                  )}
                </td>
                {/* participantsNumber */}
                <td className="p-3">
                  <input
                    type="number"
                    className="form-control"
                    value={editRegisterData.participantsNumber}
                    onChange={(e) => setEditRegisterData('participantsNumber', e.target.value)}
                  />
                  {RegistrationsEditErrors?.participantsNumber && (
                    <div className="text-red-500 text-sm">
                      {RegistrationsEditErrors.participantsNumber}
                    </div>
                  )}
                </td>
                {/* contactPerson */}
                <td className="p-3">
                  <input
                    type="text"
                    className="form-control"
                    value={editRegisterData.contactPerson}
                    onChange={(e) => setEditRegisterData('contactPerson', e.target.value)}
                  />
                  {RegistrationsEditErrors?.contactPerson && (
                    <div className="text-red-500 text-sm">
                      {RegistrationsEditErrors.contactPerson}
                    </div>
                  )}
                </td>
                {/* email */}
                <td className="p-3">
                  <input
                    type="email"
                    className="form-control"
                    value={editRegisterData.email}
                    onChange={(e) => setEditRegisterData('email', e.target.value)}
                  />
                  {RegistrationsEditErrors?.email && (
                    <div className="text-red-500 text-sm">
                      {RegistrationsEditErrors.email}
                    </div>
                  )}
                </td>
                {/* phone */}
                <td className="p-3">
                  <input
                    type="text"
                    className="form-control"
                    value={editRegisterData.phone}
                    onChange={(e) => setEditRegisterData('phone', e.target.value)}
                  />
                  {RegistrationsEditErrors?.phone && (
                    <div className="text-red-500 text-sm">
                      {RegistrationsEditErrors.phone}
                    </div>
                  )}
                </td>
                {/* Дата остается неизменной, обычно редактировать не нужно. Просто отобразим. */}
                <td className="p-3">
                  {new Date(participant.created_at).toLocaleString("us-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </td>
                {/* ticket_id */}
                <td className="p-3">
                  <input
                    type="text"
                    className="form-control"
                    value={editRegisterData.ticket_id}
                    onChange={(e) => setEditRegisterData('ticket_id', e.target.value)}
                  />
                  {RegistrationsEditErrors?.ticket_id && (
                    <div className="text-red-500 text-sm">
                      {RegistrationsEditErrors.ticket_id}
                    </div>
                  )}
                </td>
                {/* Actions: Save, Cancel */}
                <td className="p-3 text-center">
                  <button
                    onClick={submitEditResistration}
                    className="btn btn-success btn-sm mr-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEditRegistration}
                    className="btn btn-secondary btn-sm"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            );
          } else {
            // Обычная (не редактируемая) строка
            return (
              <tr
                key={participant.id}
                className="odd:bg-white odd:dark:bg-white-900 even:bg-gray-50 even:dark:bg-white-800 border-b dark:border-gray-700 border-gray-200"
                style={{ height: "50px" }}
              >
                <td className="p-3 text-center">{index + 1}</td>
                <td className="p-3">{participant.groupName}</td>
                <td className="p-3 text-center">{participant.participantsNumber}</td>
                <td className="p-3">{participant.contactPerson}</td>
                <td className="p-3">{participant.email}</td>
                <td className="p-3">{participant.phone}</td>
                <td className="p-3">
                  {new Date(participant.created_at).toLocaleString("us-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </td>
                <td className="p-3">{participant.ticket_id}</td>
                <td className="p-3 text-center flex justify">
                  {/* Кнопка Edit */}
                  <button

                    onClick={() => handleEditRegistration(participant)}
                    className=" bg-green-700 btn btn-warning btn-sm text-white mr-2"
                  >
                    Edit
                  </button>
                  
                  {/* Кнопка Delete */}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(participant.id)}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          }
        })
      ) : (
        <tr>
          <td colSpan="9" className="text-center text-muted p-4">
            No participants found
          </td>
        </tr>
      )}
    </tbody>
  </Table>
</div>
      </div>
   
      <div className=" flex justify-center mt-8 
      
     

      ">
        {participants_event.links?.map((link, index) => (
          <Link
            key={index}
            href={link.url}
            className={`mx-1 px-3 py-2 border ${link.active ? "bg-blue-600 text-white" : "bg-white text-black"}`}
            dangerouslySetInnerHTML={{ __html: link.label }}
          />
        ))}
      </div>

    </Container>
  );
}
