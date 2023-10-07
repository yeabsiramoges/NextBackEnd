// NextJs imports
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

//React imports
import { useMemo } from "react";
import { HiChat } from "react-icons/hi";
import {
    HiArrowLeftOnRectangle,
    HiUsers
} from 'react-icons/hi2';

//Webapp imports
import useGroup from "./useGroup";

const useRoutes = () => {
    const pathname = usePathname();
    const { groupId } = useGroup();

    const routes = useMemo(() => [
        {
            label: 'Group',
            href: "/groups",
            icon: HiChat,
            active: pathname === '/groups' || !!groupId
        },
        {
            label: 'Users',
            href: '/users',
            icon: HiUsers,
            active: pathname === "/users"
        },
        {
            label: 'Logout',
            href: '/',
            onClick: () => signOut(),
            icon: HiArrowLeftOnRectangle
        }
    ], [pathname, groupId])

    return routes;
}

export default useRoutes;