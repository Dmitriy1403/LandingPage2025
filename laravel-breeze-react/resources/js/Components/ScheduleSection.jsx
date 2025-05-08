import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import ScheduleItem from "./ScheduleItem";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, 
      when: "beforeChildren",
    },
  },
};


const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

export default function ScheduleSection({ event_days, speakers }) {
  const [value, setValue] = useState(0);

  const formatTime = (timeString) => {
    if (!timeString) return "";
    const date = new Date(`1970-01-01T${timeString}Z`);
    return Intl.DateTimeFormat("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(date);
  };

  return (
    <section className="container mx-auto px-6  md:px-12 lg:px-16 py-16">
      <div className="text-center mb-12 ">
        <h2 className="text-4xl font-bold text-gray-900 2k:text-5xl pb-3">Our Schedule</h2>
        <p className="text-gray-600 2k:text-3xl">
          Do not miss anything topic about the event
        </p>
      </div>

      {event_days?.length > 0 ? (
        <>
          <Tabs 
            value={value}
            onChange={(_, newVal) => setValue(newVal)}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            aria-label="scrollable schedule tabs"
            sx={{
              mb: 4,
              "& .MuiTab-root": {
                textTransform: "none",
                minWidth: 120,
                px: 3,
                py: 1.5,
                borderRadius: 1,
                bgcolor: "background.paper",
              },
              "& .Mui-selected": {
                bgcolor: "primary.main",
                color: "black",
              },
            }}
          >
            {event_days.map((day, i) => (
              <Tab 
                key={day.id}
                label={
                  <Box>
                    <Box component="span" 
                    color="text.secondary"
                    fontWeight={600}>
                      Day {i + 1}
                    </Box>
                    <Box
                      component="span"
                      display="block"
                      fontSize="0.8rem"
                      color="text.secondary"
                    >
                      {day.event_date}
                    </Box>
                  </Box>
                }
              />
            ))}
          </Tabs>

          {event_days.map((day, i) => (
            <AnimatePresence exitBeforeEnter key={day.id}>
              {value === i && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.3 },
                    },
                    exit: {
                      opacity: 0,
                      y: -10,
                      transition: { duration: 0.2 },
                    },
                  }}
                  className="mt-6"
                >
                  <h3 className="text-2xl font-semibold text-gray-800 text-center mb-6">
                    {day.title}
                  </h3>

                  {day.schedules?.length > 0 ? (
                    <motion.div variants={containerVariants}>
                      {day.schedules.map((schedule) => (
                        <motion.div
                          key={schedule.id}
                          variants={itemVariants}
                        >
                          <ScheduleItem
                            schedule={schedule}
                            formatTime={formatTime}
                          />
                        </motion.div>
                      ))}
                    </motion.div>
                  ) : (
                    <p className="text-gray-500 text-center">
                      No events for this day
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          ))}
        </>
      ) : (
        <p className="text-gray-500 text-center">No available schedule</p>
      )}
    </section>
  );
}
