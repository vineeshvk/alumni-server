import { ERROR_STATUS } from '../constants/error';
import { Event } from '../models';

export class EventService {
    getEvents = async () => {
        const events = await Event.find({});
        return { events };
    };

    addEvent = async (input: addEvent) => {
        const event = Event.create(input);
        await event.save();

        return { event };
    };

    deleteEvent = async ({ eventId }: deleteEvent) => {
        const event = await Event.findOne({ id: eventId });

        if (!event) return { error: ERROR_STATUS.EVENT_NOT_FOUND };
        await event.remove();

        return { event };
    };
}

export type addEvent = {
    contact: string;
    description?: string;
    image?: string;
    title: string;
    scheduledDate: string;
    venue: string;
};

type deleteEvent = {
    eventId: string;
};
