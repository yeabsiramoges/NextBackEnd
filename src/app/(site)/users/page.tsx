import EmptyState from "@/app/components/EmptyState";

const Users = () => {
    return (
        // the lg:pl-80 controls the size of the sidebar
        <div className="hidden lg:block flex lg:pl-80 h-full">
            <EmptyState />
        </div>
    )
}

export default Users;