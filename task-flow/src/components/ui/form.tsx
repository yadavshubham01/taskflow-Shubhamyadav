"use client"

import * as React from "react"
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"

export const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

export function FormField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({ ...props }: ControllerProps<TFieldValues, TName>) {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

export function useFormField() {
  const fieldContext = React.useContext(FormFieldContext)
  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  return {
    name: fieldContext.name,
    ...fieldState,
  }
}

export function FormItem({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={className} {...props} />
}

export function FormLabel({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={`text-sm font-medium ${className}`} {...props} />
}

export function FormControl({ ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} />
}

export function FormMessage({ className }: { className?: string }) {
  const { error } = useFormField()

  if (!error) return null

  return (
    <p className={`text-xs text-red-500 ${className}`}>
      {String(error.message)}
    </p>
  )
}