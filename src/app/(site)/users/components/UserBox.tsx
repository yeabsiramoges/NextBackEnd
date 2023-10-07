'use client';

import { User } from "@prisma/client";

// Replace with meeting

interface UserBoxProps {
    data: User
}

const UserBox: React.FC<UserBoxProps> = ({
    data
}) => {
    return (
        <div>User</div>
    );
}

export default UserBox;