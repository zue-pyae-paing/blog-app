import React, { useState, useCallback, useRef } from "react";
import { toast } from "react-toastify";
import { debounce } from "lodash";
import useAccountStore from "../../../store/useAccountStore";
import {
  changeAvatar,
  changeEmail,
  changepassword,
  changeUsername,
} from "../../../services/user.service";

const useUserActions = () => {
  const setAccount = useAccountStore((state) => state.setAccount);
  const account = useAccountStore((state) => state.account);

  const [loading, setLoading] = useState(false);
  const [username, setUserName] = useState(account.username);
  const [email, setEmail] = useState(account.email);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const  [showPassword, setShowPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);

  const fileRef = useRef<HTMLInputElement>(null);

  const debouncedUpdateUsername = useCallback(
    debounce(async (value: string) => {
      try {
        setLoading(true);
        const response = await changeUsername({ username: value });
        const result = await response.json();

        if (!response.ok) {
          toast.error(result.message || "Failed to change username");
          return;
        }

        toast.success(result.message || "Username changed successfully!");
        setAccount(result.data.user);
      } catch (error: any) {
        toast.error(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }, 1000),
    []
  );

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setUserName(newValue);
    debouncedUpdateUsername(newValue);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("avatar", file);
      const response = await changeAvatar(formData);
      const result = await response.json();
      if (!response.ok) {
        toast.error(result.message || "Failed to change avatar");
        return;
      }
      toast.success(result.message || "Avatar changed successfully!");
      setAccount(result.data.user);
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const debouncedUpdateEmail = useCallback(
    debounce(async (value: string) => {
      try {
        setLoading(true);
        const response = await changeEmail({ email: value });
        const result = await response.json();
        if (!response.ok) {
          toast.error(result.message || "Failed to change email");
          return;
        }
        toast.success(result.message || "Email changed successfully!");
        setAccount(result.data.user);
      } catch (error: any) {
        toast.error(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }, 1000),
    []
  );

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    debouncedUpdateEmail(newEmail);
  };

  const handlePasswordChange = async () => {
    try {
      setLoading(true);
      const response = await changepassword({
        currentPassword,
        newPassword,
      });
      const result = await response.json();
      if (!response.ok) {
        toast.error(result.message || "Failed to change password");
        return;
      }
      toast.success(result.message || "Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
     
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
    finally {
      setLoading(false);
    } 
  };

  const clickFileInput = () => {
    fileRef.current?.click();
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowNewPassword = () => setShowNewPassword(!showNewPassword);

  const initial = account.username.charAt(0).toUpperCase();
  const avatar = account.avatar;
  return {
    username,
    handleUsernameChange,
    loading,
    handleFileChange,
    fileRef,
    clickFileInput,
    initial,
    avatar,
    email,
    handleEmailChange,
    setCurrentPassword,
    setNewPassword,
    handlePasswordChange,
    showNewPassword,
    showPassword,
    toggleShowNewPassword,
    toggleShowPassword
  };
};

export default useUserActions;
