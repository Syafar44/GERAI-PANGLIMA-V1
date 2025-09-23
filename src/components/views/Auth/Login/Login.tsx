import { FaEye, FaEyeSlash } from "react-icons/fa6";
import Image from "next/image";
import useLogin from "./useLogin";
import { Controller } from "react-hook-form";
import { cn } from "@/utils/cn";

const Login = () => {
  const {
    isVisible,
    toggleVisibility,
    control,
    handleSubmit,
    handleLogin,
    isPendingLogin,
    errors,
  } = useLogin();
  return (
    <div className="grid gap-5 lg:gap-20">
      <div className="flex flex-col items-center justify-center gap-10 lg:w-1/3">
        <Image
          src="/image/icon/logo.png"
          alt="logo"
          width={180}
          height={180}
          className="rounded-lg"
        />
      </div>
      <div>
        <div className="p-5">
          <h2 className="text-2xl font-bold text-primary mb-2">Admin Gerai Panglima</h2>
          {errors.root && (
            <p className="mb-2 font-medium text-danger">
              {errors?.root?.message}
            </p>
          )}
          <form
            className={cn(
              "flex w-full lg:w-80 flex-col",
              Object.keys(errors).length > 0 ? "gap-2" : "gap-4",
            )}
            onSubmit={handleSubmit(handleLogin)}
          >
            {/* Email */}
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <div className="form-control w-full">
                  <input
                    {...field}
                    type="text"
                    placeholder="Username"
                    autoComplete="off"
                    className={cn(
                      "input input-bordered w-full",
                      errors.username ? "input-error" : ""
                    )}
                  />
                  {errors.username && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.username.message as string}
                      </span>
                    </label>
                  )}
                </div>
              )}
            />

            {/* Password */}
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <div className="form-control w-full">
                  <div className="relative">
                    <input
                      {...field}
                      type={isVisible ? "text" : "password"}
                      placeholder="Password"
                      autoComplete="off"
                      className={cn(
                        "input input-bordered w-full pr-10", // pr-10 buat space icon
                        errors.password ? "input-error" : ""
                      )}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <FaEye className="text-xl" />
                      ) : (
                        <FaEyeSlash className="text-xl" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.password.message as string}
                      </span>
                    </label>
                  )}
                </div>
              )}
            />

            <button color="primary" className="text-black btn disabled:bg-gray-700" type="submit" disabled={isPendingLogin}>
              {isPendingLogin ? <span className="loading loading-spinner loading-xs"></span> : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
