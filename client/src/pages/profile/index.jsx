import { useAppStore } from "@/store/slices/auth-slice"

const Profile = () => {
    const { userInfo } = useAppStore();

    return (
        <div>
            Email: {userInfo.email}
        </div>
    )
}

export default Profile