"use client";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "../Button";
import Loader from "../Loader";

const ProfileSchema = Yup.object().shape({
  name: Yup.string()
    .transform((value) => value.trim())
    .min(1, "Name cannot be empty")
    .required("Required"),
  title: Yup.string()
    .transform((value) => value.trim())
    .min(1, "Title cannot be empty")
    .required("Required"),
  about: Yup.string()
    .transform((value) => value.trim())
    .min(1, "About cannot be empty")
    .required("Required"),
});;

export default function ProfileForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create Profile</h1>
      <Formik
        initialValues={{ name: "", title: "", about: "" }}
        validationSchema={ProfileSchema}
        onSubmit={(values) => {
          setIsLoading(true)
          
          const trimmedValues = {
            name: values.name.trim(),
            title: values.title.trim(),
            about: values.about.trim(),
          };

          try {
            localStorage.setItem("profile", JSON.stringify(trimmedValues));
            router.push("/jobs");
          } catch (error) {
            console.log(error);
          } finally {
            setIsLoading(false)
          }
        }}
      >
        {({ errors, touched }) => (
          <Form className="space-y-4">
            <div>
              <label htmlFor="name">Name</label>
              <Field
                name="name"
                className="p-2 mb-2 border w-full outline-none"
                id="name"
              />
              {errors.name && touched.name && (
                <div className="text-sm text-red-500">{errors.name}</div>
              )}
            </div>
            <div>
              <label htmlFor="title">Desired Job Title</label>
              <Field
                name="title"
                className="p-2 mb-2 border w-full outline-none"
                id="title"
              />
              {errors.title && touched.title && (
                <div className="text-sm text-red-500">{errors.title}</div>
              )}
            </div>
            <div>
              <label htmlFor="about">About Me</label>
              <Field
                as="textarea"
                name="about"
                id="about"
                className="p-2 mb-2 border w-full resize-none outline-none"
              />
              {errors.about && touched.about && (
                <div className="text-sm text-red-500">{errors.about}</div>
              )}
            </div>
            <Button type="submit" className="bg-green-500 text-white px-4 py-2">
              {isLoading ? <Loader /> : 'Save'}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
