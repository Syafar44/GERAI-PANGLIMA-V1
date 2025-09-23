import { useContext, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ILogin } from "@/types/Auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { ToasterContext } from "@/contexts/ToasterContext";
import Swal from "sweetalert2";

const loginSchema = yup.object().shape({
  username: yup.string().required("Please input your username"),
  password: yup.string().required("Please input your password"),
});

const useLogin = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const { setToaster } = useContext(ToasterContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const loginService = async (payload: ILogin) => {
    console.log("payload", payload);
    const result = await signIn("credentials", {
      ...payload,
      redirect: false,
    });

    console.log("result", result);
    if (result?.error && result?.status === 401) {
      throw new Error("Login Failed");
    }
  };

  const { mutate: mutateLogin, isPending: isPendingLogin } = useMutation({
    mutationFn: loginService,
    onError: () => {
      Swal.fire({
          title: 'Login Gagal',
          icon: 'error',
          text: 'Username atau password yang anda masukkan salah.',
          confirmButtonText: 'Coba Lagi',
          buttonsStyling: false,
          customClass: {
              confirmButton: 'bg-primary hover:bg-gray-700 hover:text-white font-semibold py-2 px-4 rounded',
          }
      });
    },
    onSuccess: () => {
      reset();
      setToaster({
        type: "success",
        message: "Login success",
      });
      router.push("/admin/dashboard");
    },
  });

  const handleLogin = (data: ILogin) => mutateLogin(data);
  
  return {
    isVisible,
    toggleVisibility,
    control,
    handleSubmit,
    handleLogin,
    isPendingLogin,
    errors,
  };
};

export default useLogin;
