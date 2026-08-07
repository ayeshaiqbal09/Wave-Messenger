import { useEffect, useState } from "react";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import {
    getProfile,
    updateProfile
} from "../../../services/profileService";
import { useNavigate } from "react-router-dom";
type ProfileCardProps = {
    onboarding?: boolean;
};

function ProfileCard({ onboarding=false }: ProfileCardProps) {

    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [bio, setBio] = useState("");
    const [status, setStatus] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        loadProfile();
    }, []);

    async function loadProfile() {

        try {

            setLoading(true);
            setError("");

            const profile = await getProfile();

            setDisplayName(profile.displayName);
            setEmail(profile.email);
            setUserName(profile.userName);
            setBio(profile.bio ?? "");
            setStatus(profile.status ?? "");

        }
        catch {

            setError("Unable to load profile.");

        }
        finally {

            setLoading(false);

        }

    }
    async function handleSkip() {

    await handleSave();

}
    async function handleSave() {

        try {

            setLoading(true);
            setError("");
            setSuccess("");

            const response = await updateProfile({

                displayName,
                bio,
                status

            });

            setDisplayName(response.displayName);
            setBio(response.bio ?? "");
            setStatus(response.status ?? "");

            setSuccess("Profile updated successfully.");
            if (onboarding) {

                navigate("/chat");

            }

        }
        catch {

            setError("Unable to update profile.");

        }
        finally {

            setLoading(false);

        }

    }

    return (

        <div className="w-full max-w-md">

            <h2 className="mb-2 text-2xl font-bold">
                {onboarding ? "Complete Your Profile" : "My Profile"}
            </h2>

            <p className="mb-6 text-slate-500">
                {onboarding
                    ? "Tell people a little about yourself."
                    : "Update your profile information."}
            </p>

            <Input
                label="Display Name"
                placeholder="Display Name"
                type="text"
                value={displayName}
                onChange={setDisplayName}
            />

            <Input
                label="Bio"
                placeholder="Tell everyone about yourself"
                type="text"
                value={bio}
                onChange={setBio}
            />

            <Input
                label="Status"
                placeholder="Busy Coding..."
                type="text"
                value={status}
                onChange={setStatus}
            />

            <Input
                label="Email"
                placeholder=""
                type="email"
                value={email}
                onChange={setEmail}
                readOnly
            />

            <Input
                label="Username"
                placeholder=""
                type="text"
                value={userName}
                onChange={setUserName}
                readOnly
            />

            {error && (

                <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3">

                    <p className="text-red-700">

                        {error}

                    </p>

                </div>

            )}

            {success && (

                <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-3">

                    <p className="text-green-700">

                        {success}

                    </p>

                </div>

            )}

            

            <div className="mt-6">

                <Button
                    text={loading ? "Saving..." : "Save Changes"}
                    onClick={handleSave}
                    disabled={loading}
                    loading={loading}
                />

            </div>
            {onboarding && (

                <Button

                    text="Skip for now"

                    onClick={handleSkip}

                />

            )}

        </div>

    );

}

export default ProfileCard;