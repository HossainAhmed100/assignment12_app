import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import UseHealmet from "../Hooks/UseHealmet";
import { MdAddCircle, MdClose, MdOutlineFileUpload } from "react-icons/md";
import { HiOutlineCloudUpload } from "react-icons/hi";
import { useDropzone } from "react-dropzone";
import axios from "../axios";
import { toast } from "react-toastify";
function AllProducts() {
  const [isOPEN, setIsOPEN] = useState(false);
  const [files, setFiles] = useState(null);
  const [filess, setFiless] = useState(null);
  const imagehostKey = process.env.REACT_APP_imgbb_key;
  const [fileError, setFileError] = useState("");
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setFiless(file);
    setFiles(URL.createObjectURL(file));
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  const selected_image = <img src={files} className="w-24 rounded-xl" alt="" />;
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // Add New Product
  const onSubmit = async (data) => {
    setFileError("");
    if (files === null) {
      setFileError("Pls select image");
    } else {
      const image = filess;
      const url = `https://api.imgbb.com/1/upload?key=${imagehostKey}`;
      const formData = new FormData();
      formData.append("image", image);
      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((imageData) => {
          if (imageData.success) {
            const imgUrl = imageData.data.url;
            const product = { ...data, imgUrl };
            const postProduct = async () => {
              await axios
                .post("/addNewProduct", { product })
                .then((res) => {
                  if (res.data.acknowledged) {
                    toast.success("Product Added Succeed!");
                  }
                })
                .catch((error) => console.log(error));
            };
            postProduct();
          }
        });
      console.log(imagehostKey, filess);
    }
  };

  return (
    <div>
      <UseHealmet title={"All Product Page"} />
      <div className="container mx-auto">
        <div className="lg:p-10 p-4">
          {!isOPEN ? (
            <button
              onClick={() => setIsOPEN(!isOPEN)}
              className="btn btn-primary flex items-center justify-center"
            >
              <MdAddCircle size={25} />
              <span className="ml-2">Add New Product</span>
            </button>
          ) : (
            ""
          )}
          {isOPEN && (
            <div className="bg-white p-8 custom_box w-96">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold text-center">Add New item</h1>
                <button
                  onClick={() => setIsOPEN(!isOPEN)}
                  className="btn btn-ghost text-end"
                >
                  <MdClose size={25} />
                </button>
              </div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-3 w-full"
              >
                <div className="form-control">
                  <label>Product Name *</label>
                  <input
                    {...register("productname", { required: true })}
                    type="text"
                    placeholder="Type Your Full NAme"
                    className="input input-bordered w-full max-w-xs"
                  />
                  {errors.productname?.type === "required" && (
                    <p role="alert" className="text-red-500">
                      Product Name is required
                    </p>
                  )}
                </div>
                <div className="form-control">
                  <label>Minimum Order Quantity *</label>
                  <input
                    {...register("minorderquantity", { required: true })}
                    type="number"
                    placeholder="Type Your Email"
                    className="input input-bordered w-full max-w-xs"
                  />
                  {errors.minorderquantity?.type === "required" && (
                    <p role="alert" className="text-red-500">
                      Minimum Order Quantity is required
                    </p>
                  )}
                </div>
                <div className="form-control">
                  <label>Available Product Quantity *</label>
                  <input
                    {...register("availablequantity", { required: true })}
                    type="number"
                    placeholder="Type Your Email"
                    className="input input-bordered w-full max-w-xs"
                  />
                  {errors.availablequantity?.type === "required" && (
                    <p role="alert" className="text-red-500">
                      Available Product Quantity is required
                    </p>
                  )}
                </div>
                <div className="form-control">
                  <label>Product Price *</label>
                  <input
                    {...register("productprice", { required: true })}
                    type="number"
                    placeholder="Type Your Email"
                    className="input input-bordered w-full max-w-xs"
                  />
                  {errors.productprice?.type === "required" && (
                    <p role="alert" className="text-red-500">
                      Product Price is required
                    </p>
                  )}
                </div>
                <div className="form-control">
                  <label>Product Description *</label>
                  <textarea
                    {...register("prdescription", { required: true })}
                    className="textarea textarea-bordered w-full"
                    placeholder="Write..."
                  ></textarea>
                  {errors.prdescription?.type === "required" && (
                    <p role="alert" className="text-red-500">
                      Product Description is required
                    </p>
                  )}
                </div>
                {files && (
                  <div>
                    <div className=" rounded-xl gap-2 flex items-center justify-between w-full p-2 border-2">
                      <div>{selected_image}</div>
                      <button
                        onClick={() => setFiles(null)}
                        className="btn btn-ghost text-end"
                      >
                        <MdClose size={25} />
                      </button>
                    </div>
                  </div>
                )}
                <div>
                  <div className="flex items-center justify-center w-full">
                    <label
                      {...getRootProps()}
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-44 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <HiOutlineCloudUpload
                          size={40}
                          className="text-gray-500"
                        />
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                      <input {...getInputProps()} />
                    </label>
                  </div>
                  {fileError && (
                    <p className="text-red-500" role="alert">
                      {fileError}
                    </p>
                  )}
                </div>

                <button
                  className="btn btn-primary gap-2 flex items-center justify-center  w-full max-w-xs"
                  type="submit"
                >
                  <MdOutlineFileUpload size={23} />
                  <span>UPLOAD</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllProducts;
