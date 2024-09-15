import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { passwordChangeFormSchema } from "@/features/auth/validation/passwordChangeFormSchema";
import { z } from "zod";
import { passwordChange } from "@/features/auth/api/passwordChange";
import axios from "axios";

export const usePasswordChangeForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [serverError, setServerError ] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const reset_password_token = searchParams.get('reset_password_token');

  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(passwordChangeFormSchema),
    defaultValues: {
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit = async (value: z.infer<typeof passwordChangeFormSchema>) => {
    setIsLoading(true);
    const { password, password_confirmation } = value;
    try {
      await passwordChange({
        password,
        password_confirmation,
        reset_password_token,
      });
      router.push("/");
      router.refresh();
    } catch (error) {
      if (!axios.isAxiosError(error)) {
        setServerError("予期せぬエラーが発生しました。");
        return;
      } else {
        setServerError("サーバーエラーが発生しました。");
      } 
    } finally {
      setIsLoading(false);
    }
  };

  return { form, onSubmit, serverError, isLoading };
};