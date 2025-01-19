import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { setNotification, updateInterview } from '../store/actions';


const Calendar = () => {
    const interviews = useSelector(state => state.interviews);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Convert interviews to FullCalendar events format
    const events = interviews.map(interview => ({
        id: interview.id,
        title: `${interview.candidate} - ${interview.type}`,
        start: `${interview.date}T${interview.time}`,
        end: getEndTime(interview.date, interview.time),
        extendedProps: {
            interviewer: interview.interviewer,
            type: interview.type,
            candidate: interview.candidate
        }
    }));

    // Calculate end time (assuming 1 hour interviews)
    function getEndTime(date, time) {
        const [hours, minutes] = time.split(':');
        const endDate = new Date(`${date}T${time}`);
        endDate.setHours(parseInt(hours) + 1);
        return endDate.toISOString();
    }

    // Handle event click
    const handleEventClick = (clickInfo) => {
        const interviewId = parseInt(clickInfo.event.id);
        navigate(`/edit/${interviewId}`);
    };

    // Handle event drop (for rescheduling)
    const handleEventDrop = (dropInfo) => {
        const interviewId = parseInt(dropInfo.event.id);
        const interview = interviews.find(i => i.id === interviewId);

        if (!interview) return;

        const newStart = new Date(dropInfo.event.start);
        const updatedInterview = {
            ...interview,
            date: newStart.toISOString().split('T')[0],
            time: newStart.toTimeString().slice(0, 5)
        };

        // Check for conflicts
        const hasConflict = interviews.some(i => {
            if (i.id === interviewId) return false;
            const iStart = new Date(`${i.date}T${i.time}`);
            const iEnd = new Date(iStart.getTime() + 60 * 60 * 1000); // 1 hour later
            return (
                newStart < iEnd &&
                new Date(newStart.getTime() + 60 * 60 * 1000) > iStart &&
                (i.interviewer === interview.interviewer || i.candidate === interview.candidate)
            );
        });

        if (hasConflict) {
            dispatch(setNotification('Cannot reschedule: Time slot conflicts with existing interview', 'error'));
            dropInfo.revert();
            return;
        }

        dispatch(updateInterview(interviewId, updatedInterview));
        dispatch(setNotification('Interview rescheduled successfully'));
    };

    const renderEventContent = (eventInfo) => {
        return (
            <div className="p-1">
                <div className="font-bold text-sm">{eventInfo.event.extendedProps.candidate}</div>
                <div className="text-xs">{eventInfo.event.extendedProps.interviewer}</div>
                <div className="text-xs italic">{eventInfo.event.extendedProps.type}</div>
            </div>
        );
    };

    return (
        <div className="bg-white p-4 rounded shadow">
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                events={events}
                eventContent={renderEventContent}
                eventClick={handleEventClick}
                eventDrop={handleEventDrop}
                slotMinTime="09:00:00"
                slotMaxTime="18:00:00"
                allDaySlot={false}
                height="auto"
                aspectRatio={1.5}
            />
        </div>
    );
};

export default Calendar;