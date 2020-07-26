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

    alumniRegister = async ({
        email,
        password,
        name,
        batch,
        collegeId,
        degree,
        major,
        dob,
        gender,
        phone,
        registerNo,
    }: alumniRegister) => {
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
            major,
            dob,
            gender,
            phone,
            registerNo,
        });

        await alumni.save();

        return { user: alumni };
    };

    adminRegister = async ({
        name,
        email,
        password,
        collegeId,
    }: adminRegister) => {
        const hashPassword = hashSync(password, 8);
        const college = await College.findOne({ id: collegeId });

        const admin = Alumni.create({
            name,
            email,
            password: hashPassword,
            college,
            approved: true,
            admin: true,
        });

        await admin.save();

        return { user: admin };
    };

    getAlumni = async ({
        id,
        email,
        name,
        approved,
        batch,
        collegeId,
        degree,
        major,
    }: getAlumni) => {
        let alumni = await Alumni.find({ relations: ['college'] });

        if (id) alumni = alumni.filter((a) => a.id === id);
        if (email) alumni = alumni.filter((a) => a.email.search(email));
        if (name) alumni = alumni.filter((a) => a.name.search(name));
        if (approved != null) alumni = alumni.filter((a) => a.approved);
        if (batch) alumni = alumni.filter((a) => a.batch === batch);
        if (collegeId)
            alumni = alumni.filter((a) => a.college.id === collegeId);
        if (degree) alumni = alumni.filter((a) => a.degree === degree);
        if (major) alumni = alumni.filter((a) => a.major === major);

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

    emailAlreadyExists = async ({ email }) => {
        const alumni = await Alumni.findOne({ email });

        return { emailAlreadyExists: alumni != null };
    };
}

type login = {
    email: string;
    password: string;
};

type alumniRegister = {
    email: string;
    password: string;
    name: string;
    batch: string;
    collegeId: string;
    degree: string;
    major: string;
    dob: string;
    gender: string;
    phone: string;
    registerNo: string;
};

type adminRegister = {
    name: string;
    email: string;
    password: string;
    collegeId: string;
};

type getAlumni = {
    id?: string;
    name?: string;
    email?: string;
    approved?: boolean;
    batch?: string;
    collegeId?: string;
    degree?: string;
    major?: string;
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
