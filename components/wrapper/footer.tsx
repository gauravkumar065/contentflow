"use client";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function Footer() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data: any) => {};
  return (
    <footer className="border-t dark:bg-black">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2">
          <div className="border-b py-8 lg:order-last lg:border-b-0 lg:border-s lg:py-16 lg:ps-16">
            <div className="mt-8 space-y-4 lg:mt-0">
              <div>
                <h3 className="text-2xl font-medium">
                  Streamline Your Content: From Spark to Publish
                </h3>
                <p className="mt-4 max-w-lg">
                  Content creators, simplify your workflow with our SaaS.
                  Capture ideas, plan content, collaborate, and publish—all in
                  one place. Boost productivity and focus on creating amazing
                  content. Try our streamlined solution today and transform your
                  content creation process.
                </p>
              </div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-6 flex w-full flex-col gap-3 rounded-xl border p-4"
              >
                <Input
                  {...register("email", { required: true })}
                  placeholder="Enter your email"
                  type="email"
                />
                <Button type="submit">Sign Up</Button>
              </form>
            </div>
          </div>

          <div className="py-8 lg:py-16 lg:pe-16">
            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <p className="font-medium">Socials</p>

                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    <a
                      href="https://x.com/gauravkmr065"
                      target="_blank"
                      className="transition hover:opacity-75"
                    >
                      {" "}
                      Twitter{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.youtube.com/@gauravkumar-oy9mj"
                      target="_blank"
                      className="transition hover:opacity-75"
                    >
                      {" "}
                      YouTube{" "}
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <p className="font-medium">Helpful Links</p>

                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    <a
                      target="_blank"
                      href="/"
                      rel="noopener noreferrer"
                      className="transition hover:opacity-75"
                    >
                      {" "}
                      Docs{" "}
                    </a>
                  </li>
                  <li>
                    <a href="/" className="transition hover:opacity-75">
                      {" "}
                      Methodology{" "}
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 border-t pt-8">
              <ul className="flex flex-wrap gap-4 text-xs">
                <li>
                  <a
                    href="/"
                    target="_blank"
                    className="transition hover:opacity-75"
                  >
                    Terms & Conditions{" "}
                  </a>
                </li>

                <li>
                  <a
                    href="/"
                    target="_blank"
                    className="transition hover:opacity-75"
                  >
                    Privacy Policy{" "}
                  </a>
                </li>
              </ul>

              <p className="mt-8 text-xs">
                &copy; 2024. Contentflow LLC. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
