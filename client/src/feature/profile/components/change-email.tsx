
import useUserActions from "../hooks/useUserActions";

const ChangeEmail = () => {
  const {email,handleEmailChange} = useUserActions()
   
  return (
    <div className="space-y-3">
      <h2 className=" text-lg font-bold text-secondary">Change Email</h2>
      <input
        type="email"
        className=" input input-bordered w-full max-w-xs"
        value={email}
        onChange={handleEmailChange}
      />
    </div>
  );
};

export default ChangeEmail;
