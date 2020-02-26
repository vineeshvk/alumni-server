import { compare, hash } from 'bcryptjs';
import { Alumni } from '../models/alumni';

export class AlumniService {
    async login({ email, password }: login) {
        const alumni = await Alumni.findOne({ email });

        if (!alumni) return { error: 'User not found' };
        const isValid = compare(password, alumni.password);

        if (!isValid) return { error: 'Password not valid' };

        return { user: alumni };
    }

    async register({ email, password, name }: register) {
        const existUser = await Alumni.findOne({ email });
        if (existUser) return { error: 'Email already exist' };

        const hashPassword = await hash(password, 's');
        const alumni = Alumni.create({ email, name, password: hashPassword });

        await alumni.save();

        return { user: alumni };
    }

    async getAlumni({ id }: alumniId) {
        if (id) {
            const alumni = await Alumni.findOne({ id });
            return { user: alumni };
        } else {
            const alumni = await Alumni.find({});
            return { user: alumni };
        }
    }

    async approveAlumni({ id }: alumniId) {
        const alumni = await Alumni.findOne({ id });

        if (!alumni) return { error: 'User not found' };

        return { user: alumni };
    }
}

type login = {
    email: string;
    password: string;
};

type register = {
    email: string;
    password: string;
    name: string;
};

type alumniId = {
    id: string;
};
