import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { passwordResetFormSchema } from "@/features/auth/validation/passwordResetFormSchema";
import { z } from "zod";
import { passwordReset } from "@/features/auth/api/passwordReset";
import axios from "axios";

export const usePasswordResetForm = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(passwordResetFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (value: z.infer<typeof passwordResetFormSchema>) => {
    setIsLoading(true);
    setServerError(null);
    setIsSuccess(false);
    const { email } = value;
    try {
      await passwordReset({ email });
      setIsSuccess(true);
    } catch (error) {
      if (!axios.isAxiosError(error)) {
        setServerError("予期せぬエラーが発生しました。");
        return;
      } else if (error.response?.data.errors) {
        setServerError(error.response.data.errors);
      } else {
        setServerError("サーバーエラーが発生しました。");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { form, onSubmit, serverError, isLoading, isSuccess };
}