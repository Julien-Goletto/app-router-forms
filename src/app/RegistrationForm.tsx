"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema } from "./registrationSchema";
import type { Registration } from "./registrationSchema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/form";
import { Button } from "@ui/button";
import { Input } from "@ui/input";
// import { onDataAction } from "./actions/onDataAction";
import { onFormAction } from "./actions/onFormAction";
import { useFormState } from "react-dom";
import { useRef } from "react";

export const RegistrationForm = () => {
  const form = useForm<Registration>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      first: "",
      last: "",
      email: "",
      zipCode: "",
    },
  });

  // Classic onSubmit
  // const onSubmit = async (data: Registration) => {
  //   const response = await fetch("api/register", {
  //     method: "POST",
  //     body: JSON.stringify(data),
  //   });
  //   const responseBody = await response.json();
  //   console.log(responseBody);
  // };

  // FormData variant
  // const onSubmit = async (data: Registration) => {
  //   const formData = new FormData();
  //   Object.entries(data).forEach(([key, value]) => {
  //     formData.append(key, String(value));
  //   });

  //   const response = await fetch("/api/registerFormData", {
  //     method: "POST",
  //     body: formData,
  //   });
  //   const responseBody = await response.json();
  //   console.log(responseBody);
  // };

  // FormAction variant
  // const onSubmit = async (data: Registration) => {
  //   console.log(await onDataAction(data));
  // };

  // Form action with formData variant
  const [state, formAction] = useFormState(onFormAction, {
    message: "Please fill in the following fields, then submit.",
    issues: undefined,
  });

  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = () => formRef?.current?.submit();

  return (
    <Form {...form}>
      <p className="text">{state?.message}</p>
      {/* <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}> */}
      <form
        className="space-y-8"
        ref={formRef}
        onSubmit={form.handleSubmit(onSubmit)}
        action={formAction}
      >
        <fieldset className="grid grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="first"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="first">First Name</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormDescription>Your first name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="last">Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormDescription>Your last name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="last">ZIP code</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormDescription>Your ZIP code (ddddd).</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormDescription>Your email address.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
