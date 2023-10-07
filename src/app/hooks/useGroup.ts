import { useParams } from "next/navigation";
import { useMemo } from "react";

const useGroup = () => {
    const params = useParams();
    
    const groupId = useMemo(() => {
        if (!params?.groupId) {
            return '';
        }

        return params.groupId as string;
    }, [params?.groupId]);

    // Doubke exclamation point changes string into boolean
    const isOpen = useMemo(() => !!groupId, [groupId]);

    return useMemo(() => ({
        isOpen,
        groupId
    }), [isOpen, groupId]);
}

export default useGroup;