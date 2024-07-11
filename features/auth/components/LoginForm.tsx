"use client"

import React from 'react'
import { useLoginForm } from '../hooks/useLoginForm';
import { Input } from '@/components/ui/input';
import { LoadingButton } from '@/app/components/elements/LoadingButton';

const LoginForm = () => {
  const { form, onSubmit, serverError, isLoading } = useLoginForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-center mb-5 text-3xl font-medium text-white">ログイン</h2>
        <div className="text-white">
          <label htmlFor="email" className="mb-1 block text-2xl">メールアドレス</label>
          <Input
            type="email"
            id="email"
            placeholder="aaa@example.com"
            {...register('email')}
          />
          {errors.email && <p>※{errors.email.message}</p>}
        </div>
        <div className="text-white mt-4">
          <label htmlFor="password" className="mb-1 block text-2xl">パスワード</label>
          <Input
            type="password"
            id="password"
            placeholder="password"
            {...register('password')}
          />
          {errors.password && <p>※{errors.password.message}</p>}
        </div>
        {serverError && <p className="text-white mt-4">{serverError}</p>}
        <div className="mt-4">
        <LoadingButton
            type="submit"
            variant="outline"
            className="w-32 h-12 text-lg text-white"
            isLoading={isLoading}
          >
            ログイン
          </LoadingButton>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
