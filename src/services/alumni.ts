import { compare, hashSync } from 'bcryptjs';
import { ERROR_STATUS } from '../constants/error';
import { Alumni, College } from '../models';

export class AlumniService {
    login = async ({ email, password }: login) => {
        const alumni = await Alumni.findOne({ email });

        if (!alumni) return { error: ERROR_STATUS.USER_NOT_FOUND };
        const isValid = await compare(password, alumni.password);

        if (!isValid) return { error: ERROR_STATUS.PASSWORD_NOT_VALID };

        return { user: alumni };
    };

    register = async ({
        email,
        password,
        name,
        batch,
        collegeId,
        degree,
        department,
        dob,
        gender,
        phone,
        registerNo,
    }: register) => {
        const existUser = await Alumni.findOne({ email });
        if (existUser) return { error: ERROR_STATUS.USER_EXIST };

        const hashPassword = hashSync(password, 8);
        const college = await College.findOne({ id: collegeId });
        const alumni = Alumni.create({
            email,
            name,
            password: hashPassword,
            batch,
            college,
            degree,
            department,
            dob,
            gender,
            phone,
            registerNo,
        });

        await alumni.save();

        return { user: alumni };
    };

    getAlumni = async ({
        id,
        email,
        name,
        approved,
        batch,
        college,
        degree,
        department,
    }: getAlumni) => {
        let alumni = await Alumni.find({ relations: ['college'] });

        if (id) alumni = alumni.filter((a) => a.id === id);
        if (email) alumni = alumni.filter((a) => a.email.search(email));
        if (name) alumni = alumni.filter((a) => a.name.search(name));
        if (approved != null) alumni = alumni.filter((a) => a.approved);
        if (batch) alumni = alumni.filter((a) => a.batch === batch);
        if (college) alumni = alumni.filter((a) => a.college.name === college);
        if (degree) alumni = alumni.filter((a) => a.degree === degree);
        if (department)
            alumni = alumni.filter((a) => a.department === department);

        return { user: alumni };
    };

    approveAlumni = async ({ id }: approveAlumni) => {
        const alumni = await Alumni.findOne({ id });

        if (!alumni) return { error: ERROR_STATUS.USER_NOT_FOUND };

        return { user: alumni };
    };

    editAlumniDetails = async ({
        id,
        password,
        email,
        name,
    }: editAlumniDetails) => {
        const alumni = await Alumni.findOne({ id });

        if (!alumni) return { error: ERROR_STATUS.USER_NOT_FOUND };

        if (email) alumni.email = email;
        if (password) alumni.password = hashSync(password, 8);
        if (name) alumni.name = name;

        await alumni.save();
        return { user: alumni };
    };
}

type login = {
    email: string;
    password: string;
};

type register = {
    email: string;
    password: string;
    name: string;
    batch: number;
    collegeId: string;
    degree: string;
    department: string;
    dob: string;
    gender: string;
    phone: string;
    registerNo: string;
};

type getAlumni = {
    id?: string;
    name?: string;
    email?: string;
    approved?: boolean;
    batch?: number;
    college?: string;
    degree?: string;
    department?: string;
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
