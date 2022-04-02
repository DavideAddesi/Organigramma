import { addDays, endOfDay, setHours, setMinutes, startOfDay, subDays } from 'date-fns';
import { createResourceId } from '../utils/create-resource-id';
import { deepCopy } from '../utils/deep-copy';

const now = new Date();

let events = [
  {
    id: '5e8882e440f6322fa399eeb8',
    // allDay: true,
    color: '#D14343',
    description: 'Inform about new contract',
    end: setHours(now, 13),
    start:  setHours(now, 12),
    title: 'Occupato'
  },
  {
    id: '5e888302e62149e4b49aa609',
    // allDay: true,
    color: '#D14343',
    description: 'Discuss about the new project',
    end: setHours(now, 16),
    start:  setHours(now, 15),
    title: 'Occupato'
  },
  {
    id: '5e88830672d089c53c46ece3',
    // allDay: true,
    color: '#D14343',
    description: 'Get a new quote for the payment processor',
    end: setHours(now, 18),
    start:  setHours(now, 17),
    title: 'Occupato'
  }
];

class CalendarApi {
  getEvents() {
    return Promise.resolve(deepCopy(events));
  }

  createEvent(data) {
    return new Promise((resolve, reject) => {
      try {
        const { allDay, description, end, start, title } = data;

        // Make a deep copy
        const clonedEvents = deepCopy(events);

        // Create the new event
        const event = {
          id: createResourceId(),
          allDay,
          description,
          end,
          start,
          title
        };

        // Add the new event to events
        clonedEvents.push(event);

        // Save changes
        events = clonedEvents;

        resolve(deepCopy(event));
      } catch (err) {
        console.error('[Calendar Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  updateEvent({ eventId, update }) {
    return new Promise((resolve, reject) => {
      try {
        // Make a deep copy
        const clonedEvents = deepCopy(events);

        // Find the event that will be updated
        const event = events.find((_event) => _event.id === eventId);

        if (!event) {
          reject(new Error('Event not found'));
          return;
        }

        // Update the event
        Object.assign(event, update);

        // Save changes
        events = clonedEvents;

        resolve(deepCopy(event));
      } catch (err) {
        console.error('[Calendar Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  deleteEvent(eventId) {
    return new Promise((resolve, reject) => {
      try {
        // Make a deep copy
        const clonedEvents = deepCopy(events);

        // Find the event that will be removed
        const event = events.find((_event) => _event.id === eventId);

        if (!event) {
          reject(new Error('Event not found'));
          return;
        }

        events = events.filter((_event) => _event.id !== eventId);

        // Save changes
        events = clonedEvents;

        resolve(true);
      } catch (err) {
        console.error('[Calendar Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }
}

export const calendarApi = new CalendarApi();
