import React, { useMemo } from "react";
import { FaClock, FaMapMarkerAlt } from "react-icons/fa";

const ScheduleItem = React.memo(({ schedule, formatTime }) => {
 
  const formattedStartTime = useMemo(
    () => formatTime(schedule.start_time),
    [schedule.start_time, formatTime]
  );
  const formattedEndTime = useMemo(
    () => formatTime(schedule.end_time),
    [schedule.end_time, formatTime]
  );

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6 flex flex-col md:flex-row items-center">
      {schedule.image && (
        <div className="w-32 h-32 md:w-40 md:h-40 flex-shrink-0">
          <img
            src={`/img/${schedule.image}`}
            alt={schedule.title}
            loading="lazy"  
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      )}

      <div className="flex-1 md:ml-6 mt-4 md:mt-0">
        <h4 className="text-lg font-bold text-gray-900">{schedule.title}</h4>
        <p className="text-gray-600 mb-5">Speaker</p>
        {schedule.speakers?.length > 0 ? (
          <ul className="mt-2 space-y-2">
            {schedule.speakers.map((speaker) => (
              <li key={speaker.id} className="text-gray-700">
                <i className="fa fa-user text-blue-500 mr-2"></i>{" "}
                {speaker.name} - {speaker.email}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 mt-2">No speakers listed</p>
        )}
        <div className="items-center w-120  mt-8">
          <p className="text-black text-justify " dangerouslySetInnerHTML={{__html:schedule.description}}></p>

         

        </div>
      </div>

      <div className="text-right mt-4 md:mt-0 md:ml-6">
        <p className="text-gray-600 flex items-center">
          <FaClock className="text-gray-500 mr-2" />
          {formattedStartTime} - {formattedEndTime}
        </p>
        <p className="text-gray-600 flex items-center">
          <FaMapMarkerAlt className="text-red-500 mr-2" /> {schedule.location}
        </p>
      </div>
    </div>
  );
});

export default ScheduleItem;
