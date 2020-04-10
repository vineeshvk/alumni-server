import { getRepository } from 'typeorm';
import { Alumni, Message } from '../models';

export class MessageService {
    getMessages = async ({ alumniId }: getMessages) => {
        const alumni = await getRepository(Alumni)
            .createQueryBuilder('alumni')
            .where('alumni.id = :alumniId', { alumniId })
            .leftJoinAndSelect('alumni.messages', 'messages')
            .getOne();

        return { messages: alumni.messages };
    };

    addMessage = async ({ alumniId, isAlumni, text }: addMessage) => {
        const alumni = await Alumni.findOne({ id: alumniId });

        const message = Message.create({
            sentByUser: isAlumni,
            text,
            alumni,
        });

        await message.save();
        return { message };
    };
}

type getMessages = {
    alumniId: string;
};

type addMessage = {
    text: string;
    alumniId: string;
    isAlumni: boolean;
};
