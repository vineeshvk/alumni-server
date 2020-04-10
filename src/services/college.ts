import { ERROR_STATUS } from '../constants/error';
import { College } from '../models';

export class CollegeService {
    addCollege = async (input: addCollege) => {
        const college = College.create(input);
        await college.save();

        return { college };
    };

    getColleges = async () => {
        const colleges = await College.find();
        return { colleges };
    };

    deleteCollege = async ({ collegeId }: deleteCollege) => {
        const college = await College.findOne({ id: collegeId });
        if (!college) return { error: ERROR_STATUS.COLLEGE_NOT_FOUND };

        await college.remove();
    };
}

type addCollege = {
    address: string;
    affiliated: string;
    district: string;
    name: string;
    state: string;
};

type deleteCollege = {
    collegeId: string;
};
