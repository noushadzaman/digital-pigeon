import Background from "@/assets/login2.png"
import Victory from "@/assets/victory.svg"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { toast } from "sonner"
import { apiClient } from "@/lib/api-client"
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "@/utils/constants"
import { useNavigate } from "react-router-dom"
import { useAppStore } from "@/store/slices/auth-slice"

const Auth = () => {
    const navigate = useNavigate();
    const { setUserInfo } = useAppStore();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const validateSignUp = () => {
        if (!email.length) {
            toast.error("Email is required");
            return false;
        }
        if (!password.length) {
            toast.error("Password is required");
            return false;
        }
        if (password.length !== confirmPassword.length) {
            toast.error("Password and confirm password should be same!");
            return false;
        }
        return true;
    }

    const validateLogin = () => {
        if (!email.length) {
            toast.error("Email is required");
            return false;
        }
        if (!password.length) {
            toast.error("Password is required");
            return false;
        }
        return true;
    }

    const handleLogin = async () => {
        if (validateLogin()) {
            const response = await apiClient.post(
                LOGIN_ROUTE, { email, password }, { withCredentials: true }
            );
            if (response.data.user.id) {
                setUserInfo(response.data.user)
                if (response.data.user.profileSetup) {
                    navigate("/chat");
                }
                else {
                    navigate("/profile");
                }
            }
            console.log(response);
        }
    }

    const handleSignup = async () => {
        if (validateSignUp()) {
            const response = await apiClient.post(
                SIGNUP_ROUTE, { email, password }, { withCredentials: true }
            );
            if (response.status === 201) {
                setUserInfo(response.data.user)
                navigate('/profile');
            }
            console.log({ response });
        }
    }

    return (
        <div className="h-[100vh] w-[100vw] flex items-center justify-center">
            <div className="h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2">
                <div className="flex flex-col gap-10 items-center justify-center">
                    <div className="flex items-center justify-center flex-col">
                        <div className="flex items-center justify-center">
                            <h1 className="text-5xl font-bold md:text-6xl">Welcome</h1>
                            <img className="h-[100px]" src={Victory} alt="Victory Emoji" />
                        </div>
                        <p className="font-medium text-center">
                            Fill in the details to get the best chat app!
                        </p>
                    </div>
                    <div className="flex items justify-center w-full">
                        <Tabs className="w-3/4" defaultValue="login">
                            <TabsList className="bg-transparent rounded-none w-full">
                                <TabsTrigger className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-bold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300" value="login">Login</TabsTrigger>
                                <TabsTrigger className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-bold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300" value="signup">Sign Up</TabsTrigger>
                            </TabsList>
                            <TabsContent className="flex flex-col gap-5 mt-10" value="login">
                                <Input
                                    value={email}
                                    className="rounded-full p-6"
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                    type="email"
                                />
                                <Input
                                    value={password}
                                    className="rounded-full p-6"
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    type="password"
                                />
                                <Button
                                    onClick={handleLogin}
                                    className="rounded-full p-6"
                                >Login</Button>
                            </TabsContent>
                            <TabsContent className="flex flex-col gap-5" value="signup">
                                <Input
                                    value={email}
                                    className="rounded-full p-6"
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                    type="email"
                                />
                                <Input
                                    value={password}
                                    className="rounded-full p-6"
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    type="password"
                                />
                                <Input
                                    value={confirmPassword}
                                    className="rounded-full p-6"
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm password"
                                    type="password"
                                />
                                <Button
                                    onClick={handleSignup}
                                    className="rounded-full p-6"
                                >Sign Up</Button>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
                <div className="hidden xl:flex justify-center items-center">
                    <img className="h-[700px]" src={Background} alt="Background" />
                </div>
            </div>
        </div>
    )
}

export default Auth