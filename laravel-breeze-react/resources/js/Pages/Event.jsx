import React, { useEffect, useState } from 'react';
import {Link, usePage, useForm } from '@inertiajs/react';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { Inertia } from '@inertiajs/inertia';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


export default function ScheduleEditor() {
  const { event_days, flash } = usePage().props;
  const [speakers, setSpeakers] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [editPreviewImage, setEditPreviewImage] = useState(null);



  useEffect(() => {
    axios
      .get(route('events.getSpeakers'))
      .then((response) => setSpeakers(response.data))
      .catch((error) => console.error('Error fetching speakers:', error));
  }, []);


  const {
    data: dayData,
    setData: setDayData,
    post: postDay,
    reset: resetDayForm,
  } = useForm({
    title: '',
    event_date: '',
  });

  const submitDay = (e) => {
    e.preventDefault();
    postDay(route('events.storeDay'), {
      onSuccess: () => resetDayForm(),
    });
  };


  const {
    data: scheduleData,
    setData: setScheduleData,
    post: postSchedule,
    reset: resetScheduleForm,
  } = useForm({
    event_day_id: '',
    title: '',
    description: '',
    start_time: '',
    end_time: '',
    location: '',
    image: null,
    speakers: [],
  });

  const submitSchedule = (e) => {
    e.preventDefault();
    postSchedule(route('events.storeSchedule'), {
      onSuccess: () => resetScheduleForm(),
    });
  };


  const [editDayId, setEditDayId] = useState(null);
  const {
    data: editDayData,
    setData: setEditDayData,
    put: updateDay,
    reset: resetEditDayForm,
  } = useForm({
    title: '',
    event_date: '',
  });

  const handleEditDay = (day) => {
    setEditDayId(day.id);
    setEditDayData({
      title: day.title,
      event_date: day.event_date,
    });
  };

  const submitEditDay = (e) => {
    e.preventDefault();
    updateDay(route('events.updateDay', editDayId), {
      onSuccess: () => {
        setEditDayId(null);
        resetEditDayForm();
      },
    });
  };

  const cancelEditDay = () => {
    setEditDayId(null);
    resetEditDayForm();
  };


  const [editEventId, setEditEventId] = useState(null);

  const {
    data: editScheduleData,
    setData: setEditScheduleData,
    put: updateSchedule,
    reset: resetEditScheduleForm,
  } = useForm({
    title: '',
    description: '',
    start_time: '',
    end_time: '',
    location: '',
    image: null,
    speakers: [],
  });

  const handleEditEvent = (event) => {
    
    setEditEventId(event.id);
    setEditScheduleData({
      title: event.title,
      description: event.description || '',
      start_time: event.start_time,
      end_time: event.end_time,
      location: event.location,
      image: null,
      speakers: event.speakers ? event.speakers.map(speaker => speaker.id) : [],
    });
    console.log(event);
  };

  const submitEditEvent = (e) => {
    e.preventDefault();
    const formData = new FormData();
  formData.append("title", editScheduleData.title || '');
  formData.append("description", editScheduleData.description || '');
  formData.append("start_time", editScheduleData.start_time || '');
  formData.append("end_time", editScheduleData.end_time || '');
  formData.append("location", editScheduleData.location || '');

  // Если выбран новый файл, добавляем его
  if (editScheduleData.image) {
    formData.append("image", editScheduleData.image);
  }
  
  // Добавляем список спикеров (как массив)
  if (editScheduleData.speakers && editScheduleData.speakers.length > 0) {
    editScheduleData.speakers.forEach((speakerId, index) => {
      formData.append(`speakers[${index}]`, speakerId);
    });
  }


  formData.append("_method", "PUT");

  console.log("FormData entries:");
  for (let pair of formData.entries()) {
    console.log(pair[0] + ": " + pair[1]);
  }

  Inertia.post(route('events.updateSchedule', editEventId), formData, {
    onSuccess: () => {
      setEditEventId(null);
      resetEditScheduleForm();
      Inertia.reload();
    },
    onError: (errors) => console.log('Ошибки:', errors),
  });
  };

  const cancelEditEvent = () => {
    setEditEventId(null);
    resetEditScheduleForm();
  };


  const deleteEvent = (eventId) => {
    if (!confirm('Точно удалить это событие?')) return;
    axios
      .delete(route('events.destroySchedule', eventId))
      .then(() => location.reload())
      .catch((error) => console.error('Error deleting event:', error));
  };


  const deleteDay = (id) => {
    if (!confirm('Are you sure you want to delete this day?')) {
      return;


    }
    axios.delete(route('events.deleteDay', id)).then(() => location.reload()).catch((error) => {
      console.error('Error deleting day', error);
      alert('An error occurred while deleting the day')
    })



  }

  const deleteAll = () => {
    if (!confirm('Are you sure you want to delete ALL schedules and all days?')) {
      return;
    }
    axios
      .delete(route('events.destroyAll'))
      .then(() => location.reload())
      .catch((error) => {
        console.error('Error deleting all:', error);
        alert('An error occurred while deleting all data');
      });
  };


  const formatTime = (timeString) => {
    if (!timeString) return '';
    const date = new Date(`1970-01-01T${timeString}Z`);
    return new Intl.DateTimeFormat('ru-RU', {
      timeZone: 'UTC',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(date);
  };

  return (
    <section className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Schedule Editor</h1>

      {flash?.success && (
        <div className="bg-green-100 text-green-700 py-2 px-4 mb-4 rounded">
          {flash.success}
        </div>
      )}

      {/* Форма для добавления нового дня и нового мероприятия */}
      <div className="mb-8 flex flex-col md:flex-row md:space-x-8">
        {/* Форма добавления нового дня */}
        <form onSubmit={submitDay} className="bg-white p-6 rounded shadow flex-1 mb-4 md:mb-0">
          <h2 className="text-xl font-semibold mb-4">Add new day</h2>
          <input
            type="text"
            placeholder="Name of the day"
            value={dayData.title}
            onChange={(e) => setDayData('title', e.target.value)}
            className="w-full px-4 py-2 border rounded mb-4"
          />
          <input
            type="date"
            value={dayData.event_date}
            onChange={(e) => setDayData('event_date', e.target.value)}
            className="w-full px-4 py-2 border rounded mb-4"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Add day</button>
        </form>

        {/* Форма добавления нового мероприятия */}
        <form onSubmit={submitSchedule} className="bg-white p-6 rounded shadow flex-1">
          <h2 className="text-xl font-semibold mb-4">Add event</h2>
          <select
            value={scheduleData.event_day_id}
            onChange={(e) => setScheduleData('event_day_id', e.target.value)}
            className="w-full px-4 py-2 border rounded mb-4"
          >
            <option value="">Choose day</option>
            {event_days?.map((day) => (
              <option key={day.id} value={day.id}>
                {day.title} — {day.event_date}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Event Title"
            value={scheduleData.title}
            onChange={(e) => setScheduleData('title', e.target.value)}
            className="w-full px-4 py-2 border rounded mb-4"
          />
          <input
            type="time"
            value={scheduleData.start_time}
            onChange={(e) => setScheduleData('start_time', e.target.value)}
            className="w-full px-4 py-2 border rounded mb-4"
          />
          <input
            type="time"
            value={scheduleData.end_time}
            onChange={(e) => setScheduleData('end_time', e.target.value)}
            className="w-full px-4 py-2 border rounded mb-4"
          />
          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files[0];
              setScheduleData('image', file);
              setPreviewImage(file ? URL.createObjectURL(file) : null);
            }}
            className="w-full px-4 py-2 border rounded mb-4"
          />
          {previewImage && (
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Preview:</p>
              <img src={previewImage} alt="Preview" className="w-40 h-40 object-cover rounded-md border" />
            </div>
          )}

          <input
            type="text"
            placeholder="Venue"
            value={scheduleData.location}
            onChange={(e) => setScheduleData('location', e.target.value)}
            className="w-full px-4 py-2 border rounded mb-4"
          />
          <textarea
            placeholder="Description of the event"
            value={scheduleData.description}
            onChange={(e) => setScheduleData('description', e.target.value)}
            className="w-full px-4 py-2 border rounded mb-4"
          ></textarea>
          <label className="block font-semibold mb-2">Choose Speaker</label>
          <select
            multiple
            value={scheduleData.speakers}
            onChange={(e) =>
              setScheduleData(
                'speakers',
                [...e.target.selectedOptions].map((opt) => opt.value)
              )
            }
            className="w-full px-4 py-2 border rounded mb-4"
          >
            {speakers.map((speaker) => (
              <option key={speaker.id} value={speaker.id}>
                {speaker.name} ({speaker.title})
              </option>
            ))}
          </select>
          <button className="bg-green-600 text-white px-4 py-2 rounded">Add Event</button>
        </form>
      </div>

      {/* Кнопка для удаления всего расписания */}
      <div className="mb-8">
        <button onClick={deleteAll} className="bg-red-600 text-white px-4 py-2 rounded">
         Delete All Days and All Schedules
        </button>
      </div>

      {/* Интерфейс редактирования расписания через вкладки */}
      {event_days?.length > 0 ? (
        <Tabs>
          <TabList className="flex justify-center space-x-4 border-b pb-4">
            {event_days.map((day, index) => (
              <Tab
                key={day.id}
                className={({ selected }) =>
                  `px-6 py-2 border rounded-lg cursor-pointer transition ${selected ? 'bg-custom-gradient text-white' : 'bg-gray-200 hover:bg-gray-300'
                  }`
                }
              >
                <div className="text-center ">
                  <p className="font-semibold">Day {index + 1}</p>
                  <p className="text-sm">{day.event_date}</p>
                </div>
              </Tab>
            ))}
          </TabList>

          {event_days.map((day) => (
            <TabPanel key={day.id} className="mt-8 ">
              {/* Заголовок дня + редактирование дня */}
              <div className="flex items-center justify-between mb-12 border-8">
                {editDayId === day.id ? (
                  <form onSubmit={submitEditDay} className="flex space-x-4 items-center">
                    <input
                      type="text"
                      value={editDayData.title}
                      onChange={(e) => setEditDayData('title', e.target.value)}
                      className="px-4 py-2 border rounded"
                    />
                    <input
                      type="date"
                      value={editDayData.event_date}
                      onChange={(e) => setEditDayData('event_date', e.target.value)}
                      className="px-4 py-2 border rounded"
                    />
                    <button className="bg-blue-600 text-white px-3 py-1 rounded">Save</button>
                    <button
                      type="button"
                      onClick={cancelEditDay}
                      className="bg-gray-400 text-white px-3 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </form>
                ) : (
                  <>
                    <h2 className="text-2xl font-semibold text-gray-800">
                      {day.title} — {day.event_date}
                    </h2>
                    <div className='flex items-center space-x-4'>
                      <button
                        onClick={() => handleEditDay(day)}
                        className="bg-yellow-500 text-white px-3 py-1   rounded"
                      >
                        Edit day
                      </button>

                      <button
                        onClick={() => deleteDay(day.id)}
                        className="bg-red-600 text-white px-1 py-1  rounded "
                      >
                        delete day
                      </button>
                    </div>

                  </>
                )}
              </div>

              {/* Список мероприятий данного дня */}
              {day.schedules?.length > 0 ? (
                day.schedules.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white shadow-md rounded-lg p-6 mb-6 flex flex-col md:flex-row items-center"
                  >
                    {editEventId === event.id ? (
                      // Форма редактирования мероприятия
                      <form onSubmit={submitEditEvent} className="w-full" encType="multipart/form-data">
                        <div className="flex flex-col md:flex-row items-center mb-4 space-y-4 md:space-y-0 md:space-x-4">
                          <input
                            type="text"
                            placeholder="Название мероприятия"
                            value={editScheduleData.title}
                            onChange={(e) => setEditScheduleData('title', e.target.value)}
                            className="w-full md:w-1/3 px-4 py-2 border rounded"
                          />
                          <input
                            type="time"
                            value={editScheduleData.start_time}
                            onChange={(e) => setEditScheduleData('start_time', e.target.value)}
                            className="w-full md:w-1/5 px-4 py-2 border rounded"
                          />
                          <input
                            type="time"
                            value={editScheduleData.end_time}
                            onChange={(e) => setEditScheduleData('end_time', e.target.value)}
                            className="w-full md:w-1/5 px-4 py-2 border rounded"
                          />
                          <input
                            type="text"
                            placeholder="Место проведения"
                            value={editScheduleData.location}
                            onChange={(e) => setEditScheduleData('location', e.target.value)}
                            className="w-full md:w-1/4 px-4 py-2 border rounded"
                          />

                          <label className="block font-semibold mb-2">Select speakers</label>
                          <select
                            multiple
                            value={editScheduleData.speakers}
                            onChange={(e) =>
                              setEditScheduleData(
                                'speakers',
                                [...e.target.selectedOptions].map((opt) => opt.value)
                              )
                            }
                            className="w-full px-4 py-2 border rounded mb-4"
                          >
                            {speakers.map((speaker) => (
                              <option key={speaker.id} value={speaker.id}>
                                {speaker.name} ({speaker.title})
                              </option>
                            ))}
                          </select>


                        </div>
                        <div className="mb-4">
                          <label className="block font-semibold mb-2">Schedule description</label>
                          <CKEditor
  editor={ClassicEditor}
  config={{
    toolbar: [
      'heading', '|',
      'bold', 'italic', 'link', '|',
      'bulletedList', 'numberedList', 'blockQuote'
    ],
    heading: {
      options: [
        { model: 'paragraph', title: 'Параграф', class: 'ck-heading_paragraph' },
        { model: 'heading1', view: 'h1', title: 'Заголовок 1', class: 'ck-heading_heading1' },
        { model: 'heading2', view: 'h2', title: 'Заголовок 2', class: 'ck-heading_heading2' },
        // можно добавить и другие уровни заголовков
      ]
    }
  }}
  data={editScheduleData.description}
  onChange={(event, editor) => {
    const data = editor.getData();
    setEditScheduleData('description', data);
  }}
/>
                        </div>

                        <input
                          type="file"

                          onChange={(e) => {
                            const file = e.target.files[0];
                            setEditScheduleData('image', file);
                            setEditPreviewImage(file ? URL.createObjectURL(file) : null);
                          }}
                          className="w-full md:w-1/2 px-4 py-2 border rounded mb-4"
                        />
                        {editPreviewImage && (
                          <div className="mb-4">
                            <p className="text-sm text-gray-600 mb-2">New preview:</p>
                            <img src={editPreviewImage} alt="Edit Preview" className="w-40 h-40 object-cover rounded-md border" />
                          </div>
                        )}


                        <div className="flex space-x-2">
                          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={cancelEditEvent}
                            className="bg-gray-400 text-white px-4 py-2 rounded"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      // Отображение данных мероприятия
                      <div className="w-full flex flex-col md:flex-row items-center">
                        {event.image && (
                          <div className="w-32 h-32 md:w-40 md:h-40 flex-shrink-0 mb-4 md:mb-0">
                            <img
                              src={`/img/${event.image}`}
                              alt={event.title}
                              className="w-full h-full object-cover rounded-full"
                            />
                          </div>
                        )}
                        <div className="flex-1 md:ml-6">
                          <h3 className="text-lg font-bold text-gray-900">{event.title}</h3>
                          <p className="text-gray-600 flex items-center">
                            <FaClock className="mr-2" /> {formatTime(event.start_time)} - {formatTime(event.end_time)}
                          </p>
                          <p className="text-gray-600 flex items-center">
                            <FaMapMarkerAlt className="mr-2" /> {event.location}
                          </p>

                          <div className="mt-2" dangerouslySetInnerHTML={{ __html: event.description }}></div>
                          {event.speakers && event.speakers.length > 0 && (
                            <div className="mt-2">
                              <p className="font-semibold text-gray-700">Speakers:</p>
                              <ul>
                                {event.speakers.map((speaker) => (
                                  <li key={speaker.id} className="text-gray-600">
                                    {speaker.name} ({speaker.title})
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                        <div className="mt-4 md:mt-0 md:ml-6">
                          <button
                            onClick={() => handleEditEvent(event)}
                            className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteEvent(event.id)}
                            className="bg-red-600 text-white px-3 py-1 rounded"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center">Don't have schedule for this day</p>
              )}
            </TabPanel>
          ))}
        </Tabs>
      ) : (
        <p className="text-gray-500 text-center">Don't have abble days</p>
      )}

<button  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 mt-8 rounded">
      <Link
            href="/dashboard"
            
          >
            Back Dashboard
          </Link>
          </button>
      
    </section>


      

  );
}
