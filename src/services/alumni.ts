import { compare, hashSync } from 'bcryptjs';
import { ERROR_STATUS } from '../constants/error';
import { Alumni } from '../models';

export class AlumniService {
    async login({ email, password }: login) {
        const alumni = await Alumni.findOne({ email });

        if (!alumni) return { error: ERROR_STATUS.USER_NOT_FOUND };
        const isValid = await compare(password, alumni.password);

        if (!isValid) return { error: ERROR_STATUS.PASSWORD_NOT_VALID };

        return { user: alumni };
    }

    async register({ email, password, name }: register) {
        const existUser = await Alumni.findOne({ email });
        if (existUser) return { error: ERROR_STATUS.USER_EXIST };

        const hashPassword = hashSync(password, 8);
        const alumni = Alumni.create({ email, name, password: hashPassword });

        await alumni.save();

        return { user: alumni };
    }

    async getAlumni({ id, email, name, approved }: getAlumni) {
        let alumni = await Alumni.find();

        if (id) alumni = alumni.filter((a) => a.id === id);
        if (email) alumni = alumni.filter((a) => a.email.search(email));
        if (name) alumni = alumni.filter((a) => a.name.search(name));
        if (approved != null) alumni = alumni.filter((a) => a.approved);

        return { user: alumni };
    }

    async approveAlumni({ id }: approveAlumni) {
        const alumni = await Alumni.findOne({ id });

        if (!alumni) return { error: ERROR_STATUS.USER_NOT_FOUND };

        return { user: alumni };
    }

    async editAlumniDetails({ id, password, email, name }: editAlumniDetails) {
        const alumni = await Alumni.findOne({ id });

        if (!alumni) return { error: ERROR_STATUS.USER_NOT_FOUND };

        if (email) alumni.email = email;
        if (password) alumni.password = hashSync(password, 8);
        if (name) alumni.name = name;

        await alumni.save();
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

type getAlumni = {
    id?: string;
    name?: string;
    email?: string;
    approved?: boolean;
};

type approveAlumni = {
    id: string;
};

type editAlumniDetails = {
    id: string;
    name?: string;
    email?: string;
    password?: string;
};
